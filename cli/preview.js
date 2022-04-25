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
import { spawn } from "child_process"
import { Readable } from "stream"

/**
 * The preview action parses a source file, validates it, applies defaults, and
 * then previews an animation using the ffplay process.
 * 
 * @param {string} source - path to the source file containing a chalkboard animation
 * @param {object} options - the preview configuration options
 * @param {boolean} options.fullscreen - display the preview in a borderless fullscreen window
 * @param {boolean} options.loop - continue looping the animation from the begining
 */
export default async function preview(source, options) {
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
    
    // Create an appropriately sized canvas and rendering context
    const renderer = canvas.createCanvas(width, height)
    const ctx = renderer.getContext("2d")

    // Generate frames from an animation timeline in a steaming manner.  If the
    // "loop" option is present, this generator never terminates.
    async function* frames() {
        do {
            const start = Date.now()
            const duration = timeline.getDuration()

            while (Date.now() - start <= duration) {
                timeline.seek(Date.now() - start)

                ctx.fillStyle = background
                ctx.fillRect(0, 0, width, height)

                for (const sketch of sketches) {
                    await sketch._renderInternal(ctx)
                }

                const imageData = ctx.getImageData(0, 0, width, height)
                yield new Uint8Array(imageData.data.buffer)
            }
        } while (options.loop)
    }

    // Spawn ffplay process with supplied configuration options.  Only pass in
    // the fullsceen and ontop flags if the fullscreen option is present.
    const ffplay = spawn("ffplay", [
        "-pixel_format", "rgba",
        "-video_size", `${width}x${height}`,
        "-f", "rawvideo",
        "-window_title", "chalkboard preview",
        ...(options.fullscreen ? ["-alwaysontop"] : []),
        ...(options.fullscreen ? ["-noborder"] : []),
        ...(options.fullscreen ? ["-fs"] : []),
        "pipe:0",
    ])

    // Stream raw frames to the ffplay process.
    Readable
        .from(frames())
        .pipe(ffplay.stdin)
}