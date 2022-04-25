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

import Sketch from "./sketch.js"

export default class Canvas extends Sketch {
    #time = 0
    #painter = () => {}

    /**
     * Constructs a new Canvas.  Use a canvas when you need to animate a scene
     * that doesn't have a better suited module.  The canvas can be used to
     * animate anything, though it is generally easier to use a named module.
     * Note theat the painter function may be async.
     * 
     * @param {Sketch.defaultConfig} config - Sketch configuration object
     * @param {(ctx: CanvasRenderingContext2D, t: number) => void | Promise<void>} painter - Instructions for drawing the scene using the canvas API.  Takes a graphics context and a timestep in the range [0..1], representing progress
     */
    constructor(config = Sketch.defaultConfig, painter = () => {}) {
        super(config)
        this.#painter = painter
    }

    /**
     * Returns a mutation that updates the timestep of the canvas animation.
     * Assume that "t" is in the range [0..1].  You probably don't want to
     * override this method.  Instead, pass a custom easing in the timeline.
     * 
     * @returns {(t: number) => void} A mutation to update the timestep of a canvas animation
     */
    animate() {
        return (t) => {
            this.#time = t
        }
    }

    /**
     * Invokes the painter function with the proper graphics context and the
     * timestep of this animation.  This essentially "paints" the frame for a
     * given timestep.
     * 
     * @param {CanvasRenderingContext2D} ctx - The graphics context to draw the canvas onto
     */
    async render(ctx) {
        await this.#painter.call(this, ctx, this.#time)
    }
}
