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

export default class Square extends Sketch {
    static CENTER = Symbol("Center square draw mode")
    static CORNER = Symbol("Corner square draw mode")

    #size = 0
    #fillColor = "#000000"
    #strokeWidth = 0
    #strokeColor = "#000000"
    #strokeDashArray = []
    #strokeDashOffset = 0
    #drawMode = Square.CENTER

    /**
     * Constructs a new square, with four sides of equal length.  Enables
     * stroke animations and multible draw modes.
     * 
     * @param {Sketch.defaultConfig} config - Sketch configuration object
     * @param {number} size - The side length of the square, in pixels
     * @param {string} fillColor - The fill color of the square
     * @param {number} strokeWidth - The width of the square outline, in pixels
     * @param {string} strokeColor - The color of the square outline
     * @param {number[]} strokeDashArray - Sets the line dash pattern used when stroking lines
     * @param {number} strokeDashOffset - Sets the phase of the stroke pattern
     * @param {Square.CENTER | Square.CORNER} drawMode - The draw mode to use for rendering the square, CORNER or CENTER.
     */
    constructor(
        config = Sketch.defaultConfig, 
        size = 0, 
        fillColor = "#000000", 
        strokeWidth = 0,
        strokeColor = "#000000",
        strokeDashArray = [],
        strokeDashOffset = 0,
        drawMode = Square.CENTER,
    ) {
        super(config)

        this.#size = size
        this.#fillColor = fillColor
        this.#strokeWidth = strokeWidth
        this.#strokeColor = strokeColor
        this.#strokeDashArray = strokeDashArray
        this.#strokeDashOffset = strokeDashOffset
        this.#drawMode = drawMode
    }

    /**
     * Returns a mutation to set the size of a square.  Takes an initial size
     * and a target size.
     * 
     * @param {number} s0 - The initial size of the square, in pixels
     * @param {number} s1 - The final size of the square, in pixels
     * @returns {(t: number) => void} A mutation to se the size of the square
     */
    setSize(s0, s1) {
        return (t) => {
            this.#size = s0 + (s1 - s0) * t
        }
    }

    /**
     * Returns a mutation to set the size of the stroke width.  Takes an
     * initial width and a target width.
     * 
     * @param {number} w0 - The initial width of the square
     * @param {number} w1 - The final width of the square
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
    setStrokeWidth(w0, w1) {
        return (t) => {
            this.#strokeWidth = w0 + (w1 - w0) * t
        }
    }

    /**
     * Returns a mutationt that "draws" the stroke path of the the square by
     * using the dash array and dash offset of the square.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the square
     */
    draw() {
        return (t) => {
            this.#strokeDashArray = [4 * this.#size]
            this.#strokeDashOffset = (4 * t + 4) * this.#size
        }
    }

    /**
     * Renders the state of the square to the canvas using the provided fill and stroke
     * styles.  Centers the square on (0, 0) if `drawMode` is set to `CENTER`.
     * 
     * @param {CanvasRenderingContext2D} ctx - The graphics context to draw the square onto
     */
    async render(ctx) {
        ctx.beginPath()

        if (this.#drawMode === Square.CENTER) {
            ctx.rect(-this.#size / 2, -this.#size / 2, this.#size, this.#size)
        }

        if (this.#drawMode === Square.CORNER) {
            ctx.rect(0, 0, this.#size, this.#size)
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
