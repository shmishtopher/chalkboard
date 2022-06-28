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

import Sketch from "../core/sketch.js"

export default class Circle extends Sketch {
    #radius = 0
    #fillColor = "#000000"
    #strokeWidth = 0
    #strokeColor = "#000000"
    #strokeDashArray = []
    #strokeDashOffset = 0

    /**
     * Constructs a new circle with a radius.  Enables stroke animations and
     * multible draw modes.
     * @param {Sketch.defaultConfig} config - Sketch configuration object
     * @param {number} radius - The radius of the circle, in pixels
     * @param {string} fillColor - The fill color of the circle
     * @param {number} strokeWidth - The width of the circle outline, in pixels
     * @param {string} strokeColor - The color of the circle outline
     * @param {number[]} strokeDashArray - Sets the line dash pattern used when stroking lines
     * @param {number} strokeDashOffset - Sets the phase of the stroke pattern
     */
    constructor(
        config = Sketch.defaultConfig,
        radius = 0,
        fillColor = "#000000",
        strokeWidth = 0,
        strokeColor = "#000000",
        strokeDashArray = [],
        strokeDashOffset = 0,
    ) {
        super(config)

        this.#radius = radius
        this.#fillColor = fillColor
        this.#strokeWidth = strokeWidth
        this.#strokeColor = strokeColor
        this.#strokeDashArray = strokeDashArray
        this.#strokeDashOffset = strokeDashOffset
    }

    /**
     * Returns a mutation to set the radius of a circle.  Takes an initial
     * radius and a target radius.
     * 
     * @param {number} r0 - The initial radius of the circle, in pixels
     * @param {number} r1 - The final radius of the circle, in pixels
     * @returns {(t: number) => void} A mutation to se the radius of the circle
     */
     setRadius(r0, r1) {
        return (t) => {
            this.#radius = r0 + (r1 - r0) * t
        }
    }

    /**
     * Returns a mutation to set the size of the stroke width.  Takes an
     * initial width and a target width.
     * 
     * @param {number} w0 - The initial width of the circle
     * @param {number} w1 - The final width of the circle
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
     setStrokeWidth(w0, w1) {
        return (t) => {
            this.#strokeWidth = w0 + (w1 - w0) * t
        }
    }

    /**
     * Returns a mutationt that "draws" the stroke path of the the circle by
     * using the dash array and dash offset of the circle.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the circle
     */
     draw() {
        this.#strokeDashArray = [2 * Math.PI * this.#radius]
        this.#strokeDashOffset = 2 * Math.PI * this.#radius

        return (t) => {
            this.#strokeDashArray = [2 * Math.PI * this.radius]
            this.#strokeDashOffset = (t + 1) * 2 * Math.PI * this.#radius
        }
    }

    /**
     * Returns a mutation that applies a stroke color change over time.  Takes
     * a function that takes a number in [0..1] as input and returns a color
     * string.
     * 
     * @param {(t: number) => string} colorFn - A function that takes numbers in the range [0..1] and returns a color string
     * @returns {(t: number) => void} A mutation to change the stroke color
     */
     setStrokeColor(colorFn) {
        return (t) => {
            this.#strokeColor = colorFn(t)
        }
    }

    /**
     * Returns a mutation that applies a fill color change over time.  Takes
     * a function that takes a number in [0..1] as input and returns a color
     * string.
     * 
     * @param {(t: number) => string} colorFn - A function that takes numbers in the range [0..1] and returns a color string
     * @returns {(t: number) => void} A mutation to change the fill color
     */
     setFillColor(colorFn) {
        return (t) => {
            this.#fillColor = colorFn(t)
        }
    }

    /**
     * Renders the state of the circle to the canvas using the provided fill 
     * and stroke styles. 
     * 
     * @param {CanvasRenderingContext2D} ctx - The graphics context to draw the circle onto
     */
    async render(ctx) {
        ctx.beginPath()

        ctx.ellipse(0, 0, this.#radius, this.#radius, 0, 0, 2 * Math.PI)

        ctx.fillStyle = this.#fillColor
        ctx.strokeStyle = this.#strokeColor
        ctx.lineWidth = this.#strokeWidth

        ctx.setLineDash(this.#strokeDashArray)
        ctx.lineDashOffset = this.#strokeDashOffset
        
        ctx.fill()
        ctx.stroke()
    }
}
