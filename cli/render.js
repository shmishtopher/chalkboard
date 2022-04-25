// Copyright 2022 Christopher K. "Shmish" Schmitt
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import path from "path"
import canvas from "canvas"
import stream from "stream"
import { spawn } from "child_process"
import { createWriteStream } from "fs"

/**
 * The render action parses a source file, validates it, applies defaults, and
 * then renders an animation to an output file using the ffmpeg process.
 * 
 * @param {string} source - path to the source file containing a chalkboard animation
 * @param {string} output - path to write the video output
 */
export default async function render(source, output) {
    const location = "file://" + path.resolve(source)
    const animation = await import(location)

    // Validate an animation file by making sure that the file exports a
    // config, timeline, and has a list of exported default Sketches.
    if (!Object.hasOwn(animation, "config")) {
        throw new Error("Animation does not export a config")
    }

    if (!Object.hasOwn(animation, "default")) {
        throw new Error("Animation does not export a default Sketch list")
    }

    if (!Object.hasOwn(animation, "timeline")) {
        throw new Error("Animation does not export a timeline")
    }

    // Pull required config and animation constructs into constants
    const timeline = animation.timeline
    const sketches = animation.default
    const background = animation.config.bg ?? "#FDF6E3"
    const width = animation.config.width ?? 1920
    const height = animation.config.height ?? 1080
    const fps = animation.config.fps ?? 60
    
    // Create an appropriately sized canvas and rendering context
    const renderer = canvas.createCanvas(width, height)
    const ctx = renderer.getContext("2d")

    // Generate frames from an animation timeline in a steaming manner.  Steps
    // by one frame each yield.
    async function* frames() {
        for (let t = 0; t <= timeline.getDuration(); t += 1000 / fps) {
            timeline.seek(t)

            ctx.fillStyle = background
            ctx.fillRect(0, 0, width, height)
            
            for (const sketch of sketches) {
                await sketch._renderInternal(ctx)
            }

            const imageData = ctx.getImageData(0, 0, width, height)
            yield new Uint8Array(imageData.data.buffer)
        }
    }

    // Spawn the ffmpeg process with supplied configuration options.
    const ffmpeg = spawn("ffmpeg", [
        "-pixel_format", "rgba",
        "-video_size", `${width}x${height}`,
        "-r", fps,
        "-f", "rawvideo",
        "-i", "pipe:0",
        "-movflags", "frag_keyframe+empty_moov",
        "-pix_fmt", "yuv420p",
        "-vcodec", "h264",
        "-crf", "12",
        "-r", fps,
        "-f", "mp4",
        "pipe:1",
    ])

    // Create the file writer stream and the ffmpeg transformation stream.
    const movieStream = createWriteStream(path.resolve(output))
    const ffmpegStream = stream.Transform.from({
        readable: ffmpeg.stdout,
        writable: ffmpeg.stdin,
    })

    // Stream raw frames to the ffmepg process and write the video.
    stream.Readable
        .from(frames())
        .pipe(ffmpegStream)
        .pipe(movieStream)
}