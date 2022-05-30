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

export default class Polygon extends Sketch {
    #sides = 3
    #radius = 0
    #fillColor = "#000000"
    #strokeWidth = 0
    #strokeColor = "#000000"
    #strokeDashArray = []
    #strokeDashOffset = 0
    #drawMode = Polygon.CENTER

    /**
     * Constructs a new polygon, with n sides of equal length.  Enables
     * stroke animations and multible draw modes.
     * 
     * @param {Sketch.defaultConfig} config - Sketch configuration object
     * @param {number} radius - The radius of the polygon, in pixels
     * @param {string} fillColor - The fill color of the polygon
     * @param {number} strokeWidth - The width of the polygon outline, in pixels
     * @param {string} strokeColor - The color of the polygon outline
     * @param {number[]} strokeDashArray - Sets the line dash pattern used when stroking lines
     * @param {number} strokeDashOffset - Sets the phase of the stroke pattern
     */
    constructor(
        config = Sketch.defaultConfig, 
        sides = 3,
        radius = 0,
        fillColor = "#000000", 
        strokeWidth = 0,
        strokeColor = "#000000",
        strokeDashArray = [],
        strokeDashOffset = 0,
    ) {
        super(config)

        this.#sides = sides
        this.#radius = radius
        this.#fillColor = fillColor
        this.#strokeWidth = strokeWidth
        this.#strokeColor = strokeColor
        this.#strokeDashArray = strokeDashArray
        this.#strokeDashOffset = strokeDashOffset
    }

    /**
     * Returns a mutation to set the radius of a polygon.  Takes an initial 
     * radius and a target radius.
     * 
     * @param {number} r0 - The initial radius of the polygon, in pixels
     * @param {number} r1 - The final radius of the polygon, in pixels
     * @returns {(t: number) => void} A mutation to se the radius of the polygon
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
     * @param {number} w0 - The initial width of the polygon
     * @param {number} w1 - The final width of the polygon
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
    setStrokeWidth(w0, w1) {
        return (t) => {
            this.#strokeWidth = w0 + (w1 - w0) * t
        }
    }

    /**
     * Returns a mutationt that "draws" the stroke path of the the polygon by
     * using the dash array and dash offset of the polygon.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the polygon
     */
    draw() {
        this.#strokeDashArray = [2 * this.#radius * this.#sides * Math.sin(Math.PI / this.#sides)]
        this.#strokeDashOffset = 2 * this.#radius * this.#sides * Math.sin(Math.PI / this.#sides)

        return (t) => {
            this.#strokeDashArray = [2 * this.#radius * this.#sides * Math.sin(Math.PI / this.#sides)]
            this.#strokeDashOffset = (t + 1) * 2 * this.#radius * this.#sides * Math.sin(Math.PI / this.#sides)
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
     * Renders the state of the polygon to the canvas using the provided fill 
     * and stroke styles. 
     * 
     * @param {CanvasRenderingContext2D} ctx - The graphics context to draw the polygon onto
     */
    async render(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.#radius, 0)

        for (let i = 0; i < this.#sides; i += 1) {
            ctx.lineTo(
                Math.cos(i * 2 * Math.PI / this.#sides) * this.#radius,
                Math.sin(i * 2 * Math.PI / this.#sides) * this.#radius,
            )
        }

        ctx.closePath()

        ctx.fillStyle = this.#fillColor
        ctx.strokeStyle = this.#strokeColor
        ctx.lineWidth = this.#strokeWidth

        ctx.setLineDash(this.#strokeDashArray)
        ctx.lineDashOffset = this.#strokeDashOffset
        
        ctx.fill()
        ctx.stroke()
    }
}
