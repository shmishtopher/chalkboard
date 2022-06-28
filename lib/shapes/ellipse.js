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

export default class Ellipse extends Sketch {
    #radiusX = 0
    #radiusY = 0
    #fillColor = "#000000"
    #strokeWidth = 0
    #strokeColor = "#000000"
    #strokeDashArray = []
    #strokeDashOffset = 0

    /**
     * Constructs a new ellipse with an x-radius and y-radius.  Enables stroke 
     * animations and multible draw modes.
     * @param {Sketch.defaultConfig} config - Sketch configuration object
     * @param {number} radiusX - The x-radius of the ellipse
     * @param {number} radiusY - The y-radius of the ellipse
     * @param {string} fillColor - The fill color of the ellipse
     * @param {number} strokeWidth - The width of the ellipse outline, in pixels
     * @param {string} strokeColor - The color of the ellipse outline
     * @param {number[]} strokeDashArray - Sets the line dash pattern used when stroking lines
     * @param {number} strokeDashOffset - Sets the phase of the stroke pattern
     */
    constructor(
        config = Sketch.defaultConfig,
        radiusX = 0,
        radiusY = 0,
        fillColor = "#000000",
        strokeWidth = 0,
        strokeColor = "#000000",
        strokeDashArray = [],
        strokeDashOffset = 0,
    ) {
        super(config)

        this.#radiusX = radiusX
        this.#radiusY = radiusY
        this.#fillColor = fillColor
        this.#strokeWidth = strokeWidth
        this.#strokeColor = strokeColor
        this.#strokeDashArray = strokeDashArray
        this.#strokeDashOffset = strokeDashOffset
    }

    /**
     * Returns a mutation to set the x-radius of an ellipse.  Takes an initial
     * radius and a target radius.
     * 
     * @param {number} r0 - The initial x-radius of the ellipse, in pixels
     * @param {number} r1 - The final x-radius of the ellipse, in pixels
     * @returns {(t: number) => void} A mutation to se the x-radius of the ellipse
     */
     setRadiusX(r0, r1) {
        return (t) => {
            this.#radiusX = r0 + (r1 - r0) * t
        }
    }

    /**
     * Returns a mutation to set the y-radius of an ellipse.  Takes an initial
     * radius and a target radius.
     * 
     * @param {number} r0 - The initial y-radius of the ellipse, in pixels
     * @param {number} r1 - The final y-radius of the ellipse, in pixels
     * @returns {(t: number) => void} A mutation to se the y-radius of the ellipse
     */
     setRadiusY(r0, r1) {
        return (t) => {
            this.#radiusY = r0 + (r1 - r0) * t
        }
    }

    /**
     * Returns a mutation to set the x and y radii of an ellipse.  Takes an initial
     * radius pair and a target radius pair.
     * 
     * @param {number} rx0 - The initial x-radius of the ellipse, in pixels
     * @param {number} ry0 - The initial y-radius of the ellipse, in pixels
     * @param {number} rx1 - The final x-radius of the ellipse, in pixels
     * @param {number} ry1 - The final y-radius of the ellipse, in pixels
     * @returns {(t: number) => void} A mutation to se the radii of the ellipse
     */
     setRadius(rx0, ry0, rx1, ry1) {
        return (t) => {
            this.#radiusX = rx0 + (rx1 - rx0) * t
            this.#radiusY = ry0 + (ry1 - ry0) * t
        }
    }

    /**
     * Returns a mutation to set the size of the stroke width.  Takes an
     * initial width and a target width.
     * 
     * @param {number} w0 - The initial width of the ellipse
     * @param {number} w1 - The final width of the ellipse
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
     setStrokeWidth(w0, w1) {
        return (t) => {
            this.#strokeWidth = w0 + (w1 - w0) * t
        }
    }

    /**
     * Returns a mutationt that "draws" the stroke path of the the ellipse by
     * using the dash array and dash offset of the ellipse.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the ellipse
     */
     draw() {
        this.#strokeDashArray = [Math.PI * (this.#radiusX + this.#radiusY)]
        this.#strokeDashOffset = Math.PI * (this.#radiusX + this.#radiusY)

        return (t) => {
            this.#strokeDashArray = [Math.PI * (this.#radiusX + this.#radiusY)]
            this.#strokeDashOffset = (t + 1) * Math.PI * (this.#radiusX + this.#radiusY)
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
     * Renders the state of the ellipse to the canvas using the provided fill 
     * and stroke styles. 
     * 
     * @param {CanvasRenderingContext2D} ctx - The graphics context to draw the ellipse onto
     */
    async render(ctx) {
        ctx.beginPath()

        ctx.ellipse(0, 0, this.#radiusX, this.#radiusY, 0, 0, 2 * Math.PI)

        ctx.fillStyle = this.#fillColor
        ctx.strokeStyle = this.#strokeColor
        ctx.lineWidth = this.#strokeWidth

        ctx.setLineDash(this.#strokeDashArray)
        ctx.lineDashOffset = this.#strokeDashOffset
        
        ctx.fill()
        ctx.stroke()
    }
}
