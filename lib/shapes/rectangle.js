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

export default class Rectangle extends Sketch {
    static CENTER = Symbol("Center rectangle draw mode")
    static CORNER = Symbol("Corner rectangle draw mode")

    #width = 0
    #height = 0
    #fillColor = "#000000"
    #strokeWidth = 0
    #strokeColor = "#000000"
    #strokeDashArray = []
    #strokeDashOffset = 0
    #drawMode = Rectangle.CENTER

    /**
     * Constructs a new rectangle, with four sides of unequal length.  Enables
     * stroke animations and multible draw modes.
     * 
     * @param {Sketch.defaultConfig} config - Sketch configuration object
     * @param {number} width - The side length across the x-axis, in pixels
     * @param {number} height - The side length across the y-axis, in pixels
     * @param {string} fillColor - The fill color of the rectangle
     * @param {number} strokeWidth - The width of the rectangle outline, in pixels
     * @param {string} strokeColor - The color of the rectangle outline
     * @param {number[]} strokeDashArray - Sets the line dash pattern used when stroking lines
     * @param {number} strokeDashOffset - Sets the phase of the stroke pattern
     * @param {rectangle.CENTER | rectangle.CORNER} drawMode - The draw mode to use for rendering the rectangle, CORNER or CENTER.
     */
    constructor(
        config = Sketch.defaultConfig, 
        width = 0,
        height = 0,
        fillColor = "#000000", 
        strokeWidth = 0,
        strokeColor = "#000000",
        strokeDashArray = [],
        strokeDashOffset = 0,
        drawMode = Rectangle.CENTER,
    ) {
        super(config)

        this.#width = width
        this.#height = height
        this.#fillColor = fillColor
        this.#strokeWidth = strokeWidth
        this.#strokeColor = strokeColor
        this.#strokeDashArray = strokeDashArray
        this.#strokeDashOffset = strokeDashOffset
        this.#drawMode = drawMode
    }

    /**
     * Returns a mutation to set the size of a rectangle.  Takes an initial size
     * and a target size.
     * 
     * @param {number} w0 - The initial width of the rectangle, in pixels
     * @param {number} h0 - The initial height of the rectangle, in pixels
     * @param {number} w1 - The final width of the rectangle, in pixels
     * @param {number} h1 - The final height of the rectangle, in pixels
     * @returns {(t: number) => void} A mutation to set the size of the rectangle
     */
    setSize(w0, h0, w1, h1) {
        return (t) => {
            this.#width = w0 + (w1 - w0) * t
            this.#height = h0 + (h1 - h0) * t
        }
    }

    /**
     * Returns a mutation that sets the width of the rectangle.  Takes an
     * initial width and target width.
     * 
     * @param {number} w0 - The initial width of the rectangle
     * @param {number} w1 - The final width of the rectangle
     * @returns {(t: number) => void} A mutation to set the width of the rectangle
     */
    setWidth(w0, w1) {
        return (t) => {
            this.#width = w0 + (w1 - w0) * t
        }
    }

    /**
     * Returns a mutation thats sets the height of the rectangle. Takes an
     * initial height and target height.
     * 
     * @param {number} h0 - The initial height of the rectangle, in pixels
     * @param {number} h1 - The target height of the rectangle, in pixels
     * @returns 
     */
    setHeight(h0, h1) {
        return (t) => {
            this.#height = h0 + (h1 - h0) * t
        }
    }

    /**
     * Returns a mutation to set the size of the stroke width.  Takes an
     * initial width and a target width.
     * 
     * @param {number} w0 - The initial width of the rectangle
     * @param {number} w1 - The final width of the rectangle
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
    setStrokeWidth(w0, w1) {
        return (t) => {
            this.#strokeWidth = w0 + (w1 - w0) * t
        }
    }

    /**
     * Returns a mutationt that "draws" the stroke path of the the rectangle by
     * using the dash array and dash offset of the rectangle.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the rectangle
     */
    draw() {
        this.#strokeDashArray = [2 * this.#width + 2 * this.height]
        this.#strokeDashOffset = 2 * this.#width + 2 * this.height

        return (t) => {
            this.#strokeDashArray = [2 * this.#width + 2 * this.height]
            this.#strokeDashOffset = (2 * t + 2) * this.#width + (2 * t + 2) * this.#height
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
     * Renders the state of the rectangle to the canvas using the provided fill and stroke
     * styles.  Centers the rectangle on (0, 0) if `drawMode` is set to `CENTER`.
     * 
     * @param {CanvasRenderingContext2D} ctx - The graphics context to draw the rectangle onto
     */
    async render(ctx) {
        ctx.beginPath()

        if (this.#drawMode === Rectangle.CENTER) {
            ctx.rect(-this.#width / 2, -this.#height / 2, this.#width, this.#height)
        }

        if (this.#drawMode === Rectangle.CORNER) {
            ctx.rect(0, 0, this.#width, this.#height)
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
