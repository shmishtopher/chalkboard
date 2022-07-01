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

export default class Points extends Sketch {
    #points = []
    #fillColor = "#000000"
    #strokeWidth = 0
    #strokeColor = "#000000"
    #strokeDashArray = []
    #strokeDashOffset = 0
    #perimiter = 0

    /**
     * Constructs a new polygon out of a list of point positions about the
     * origin of the sketch.  Enables stroke animation and draw modes.
     * 
     * @param {Sketch.defaultConfig} config
     * @param {[number, number][]} points
     * @param {string} fillColor
     * @param {number} strokeWidth
     * @param {string} strokeColor
     * @param {number[]} strokeDashArray
     * @param {number} strokeDashOffset
     */
    constructor(
        config = Sketch.defaultConfig,
        points = [],
        fillColor = "#000000",
        strokeWidth = 0,
        strokeColor = "#000000",
        strokeDashArray = [],
        strokeDashOffset = 0,
    ) {
        super(config)

        this.#points = points
        this.#fillColor = fillColor
        this.#strokeWidth = strokeWidth
        this.#strokeColor = strokeColor
        this.#strokeDashArray = strokeDashArray
        this.#strokeDashOffset = strokeDashOffset
        
        for (let i = 0; i < points.length - 1; i += 1) {
            const [x0, y0] = points[i + 0]
            const [x1, y1] = points[i + 1]

            this.#perimiter += Math.hypot(x1 - x0, y1 - y0)
        }
    }

    /**
     * Returns a mutation that modifies the x-coordinate of an individual point
     * selected by index.  Takes a point index, initial x position, and final
     * x position.
     * 
     * @param {number} index - The index of the point to mutate
     * @param {number} x0 - The initial x-position
     * @param {number} x1 - The final x-position
     * @returns {(t: number) => void} A mutation to modify the x-position of a point
     */
    setPointX(index, x0, x1) {
        return (t) => {
            this.#points[index][0] = x0 + (x1 - x0) * t
        }
    }

    /**
     * Returns a mutation that modifies the y-coordinate of an individual point
     * selected by index.  Takes a point index, initial y position, and final
     * y position.
     * 
     * @param {number} index - The index of the point to mutate
     * @param {number} y0 - The initial y-position
     * @param {number} y1 - The final y-position
     * @returns {(t: number) => void} A mutation to modify the y-position of a point
     */
    setPointY(index, y0, y1) {
        return (t) => {
            this.#points[index][1] = y0 + (y1 - y0) * t
        }
    }

    /**
     * Returns a mutation that modifies the coordinates of an individual point
     * selected by index,  Takes a point index, initial position, and final
     * position.
     * 
     * @param {number} index - The index of the point to mutate
     * @param {number} x0 - The initial x position
     * @param {number} y0 - the initial y position
     * @param {number} x1 - the final x position
     * @param {number} y1 - the final y position
     * @returns {(t: number) => void} A mutation to modify the position of a point
     */
    setPoint(index, x0, y0, x1, y1) {
        return (t) => {
            this.#points[index][0] = x0 + (x1 - x0) * t
            this.#points[index][1] = y0 + (y1 - y0) * t
        }
    }

    /**
     * Returns a mutation to set the size of the stroke width.  Takes an
     * initial width and a target width.
     * 
     * @param {number} w0 - The initial width
     * @param {number} w1 - The final width
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
    setStrokeWidth(w0, w1) {
        return (t) => {
            this.#strokeWidth = w0 + (w1 - w0) * t
        }
    }

    /**
     * Returns a mutationt that "draws" the stroke path of the the shape by
     * using the dash array and dash offset.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the shape
     */
     draw() {
        for (let i = 0; i < this.#points.length - 1; i += 1) {
            const [x0, y0] = this.#points[i + 0]
            const [x1, y1] = this.#points[i + 1]

            this.#perimiter += Math.hypot(x1 - x0, y1 - y0)
        }

        this.#strokeDashArray = [this.#perimiter]
        this.#strokeDashOffset = this.#perimiter

        return (t) => {
            this.#strokeDashArray = [this.#perimiter]
            this.#strokeDashOffset = (1 + t) * this.#perimiter
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
     * Renders the state of the shape to the canvas using the provided fill and stroke
     * styles.
     * 
     * @param {CanvasRenderingContext2D} ctx - The graphics context to draw the shape onto
     */
    async render(ctx) {
        ctx.beginPath()

        const [x0, y0] = this.#points[0]
        ctx.moveTo(x0, y0)

        for (const [x, y] of this.#points) {
            ctx.lineTo(x, y)
        }

        ctx.fillStyle = this.#fillColor
        ctx.strokeStyle = this.#strokeColor
        ctx.lineWidth = this.#strokeWidth

        ctx.setLineDash(this.#strokeDashArray)
        ctx.lineDashOffset = this.#strokeDashOffset
        
        ctx.fill()
        ctx.stroke()
    }
}
