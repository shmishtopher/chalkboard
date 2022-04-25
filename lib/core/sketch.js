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

export default class Sketch {
    #x = 0
    #y = 0
    #xScale = 1
    #yScale = 1
    #xSkew = 0
    #ySkew = 0
    #rotation = 0
    #alpha = 1

    /**
     * @property {number} x - The x position of the sketch instance, in pixels
     * @property {number} y - The y position of the sketch instance, in pixels
     * @property {number} xScale - The scale of the sketch instance along the x-axis
     * @property {number} yScale - The scale of the sketch instance along the y-axis
     * @property {number} xSkew - The x-axis skew of the sketch instance
     * @property {number} ySkew - The y-axis skew of the sketch instance
     * @property {number} rotation - The rotation of the sketch instance about (0, 0)
     * @property {number} alpha - The transparancy of the sketch instance in the range [0..1]
     */
    static defaultConfig = {
        x: 0,
        y: 0,
        xScale: 1,
        yScale: 1,
        xSkew: 0,
        ySkew: 0,
        rotation: 0,
        alpha: 1,
    }

    /**
     * Constructs a new Sketch.  In general, you should not be doing this.
     * Instead, instantiate a class that extends "Sketch" or use the "Canvas"
     * class.
     * 
     * @param {Sketch.defaultConfig} config - Configuration object
     */
    constructor(config) {
        this.#x = config.x ?? Sketch.defaultConfig.x
        this.#y = config.y ?? Sketch.defaultConfig.y
        this.#xScale = config.xScale ?? Sketch.defaultConfig.xScale
        this.#yScale = config.yScale ?? Sketch.defaultConfig.yScale
        this.#xSkew = config.xSkew ?? Sketch.defaultConfig.xSkew
        this.#ySkew = config.ySkew ?? Sketch.defaultConfig.ySkew
        this.#rotation = config.rotation ?? Sketch.defaultConfig.rotation
        this.#alpha = config.alpha ?? Sketch.defaultConfig.alpha
    }

    /**
     * Returns a mutation that translates the sketch from an initial set of
     * coordinates to a target location.
     * 
     * @param {number} x0 - The initial x coordinate, in pixels
     * @param {number} y0 - The initial y coordinate, in pixels
     * @param {number} x1 - The target x coordinate
     * @param {number} y1 - The target y coordinate
     * @returns {(t: number) => void} A mutation to translate the sketch
     */
    translate(x0, y0, x1, y1) {
        return (t) => {
            this.#x = x0 + (x1 - x0) * t
            this.#y = y0 + (y1 - y0) * t
        }
    }

    /**
     * Returns a mutation that translates the sketch along the x-axis from an
     * initial x position to a target x position.
     * 
     * @param {number} x0 - The initial x coordinate, in pixels
     * @param {number} x1 - The target x coordinate, in pixels
     * @returns {(t: number) => void} A mutation to translate the sketch along the x-axis
     */
    translateX(x0, x1) {
        return (t) => {
            this.#x = x0 + (x1 - x0) * t;
        }
    }

    /**
     * Returns a mutation that translates the sketch along the y-axis from an
     * initial y position to a target y position.
     * 
     * @param {number} y0 - The initial y coordinate, in pixels
     * @param {number} y1 - The target y coordinate, in pixels
     * @returns {(t: number) => void} A mutation to transslate the sketch along the y-axis
     */
     translateY(y0, y1) {
        return (t) => {
            this.#y = y0 + (y1 - y0) * t;
        }
    }

    /**
     * Returns a mutation that rotates the sketch from an initial angle to a
     * target angle
     * 
     * @param {number} r0 - The initial rotation, in radians
     * @param {number} r1 - The target rotation, in radians
     * @returns {(t: number) => void} A mutation to rotate the sketch
     */
    rotate(r0, r1) {
        return (t) => {
            this.#rotation = r0 + (r1 - r0) * t
        }
    }

    /**
     * Returns a mutation to scale the sketch along the x and y axis from an
     * initial scale to a target scale.
     * 
     * @param {number} sx0 - The initial x scale
     * @param {number} sy0 - The initial y scale
     * @param {number} sx1 - The target x scale
     * @param {number} sy1 - The target y scale
     * @returns A mutation to scale the sketch
     */
    scale(sx0, sy0, sx1, sy1) {
        return (t) => {
            this.#xScale = sx0 + (sx1 - sx0) * t
            this.#yScale = sy0 + (sy1 - sy0) * t
        }
    }

    /**
     * Returns a mutation to scale the sketch along the x-axis from an
     * initial scale to a target scale.
     * 
     * @param {number} sx0 - The initial x scale
     * @param {number} sx1 - The target x scale
     * @returns A mutation to scale the sketch along the x-axis
     */
    scaleX(sx0, sx1) {
        return (t) => {
            this.#xScale = sx0 + (sx1 - sx0) * t
        }
    }

    /**
     * Returns a mutation to scale the sketch along the y-axis from an
     * initial scale to a target scale.
     * 
     * @param {number} sy0 - The initial y scale
     * @param {number} sy1 - The target y scale
     * @returns A mutation to scale the sketch along the y-axis
     */
    scaleY(sy0, sy1) {
        return (t) => {
            this.#yScale = sy0 + (sy1 - sy0) * t
        }
    }

    /**
     * Returns a mutation to skew the sketch along the x and y axis from an
     * initial skew to a target skew.
     * 
     * @param {number} sx0 - The initial x skew
     * @param {number} sy0 - The initial y skew
     * @param {number} sx1 - The target x skew
     * @param {number} sy1 - The target y skew
     * @returns A mutation to skew the sketch
     */
    skew(sx0, sy0, sx1, sy1) {
        return (t) => {
            this.#xSkew = sx0 + (sx1 - sx0) * t
            this.#ySkew = sy0 + (sy1 - sy0) * t
        }
    }

    /**
     * Returns a mutation to skew the sketch along the x-axis from an
     * initial skew to a target skew.
     * 
     * @param {number} sx0 - The initial x skew
     * @param {number} sx1 - The target x skew
     * @returns A mutation to skew the sketch along the x-axis
     */
    skewX(sx0, sx1) {
        return (t) => {
            this.#xSkew = sx0 + (sx1 - sx0) * t
        }
    }

    /**
     * Returns a mutation to skew the sketch along the y-axis from an
     * initial skew to a target skew.
     * 
     * @param {number} sy0 - The initial y skew
     * @param {number} sy1 - The target y skew
     * @returns A mutation to skew the sketch along the y-axis
     */
    skewY(sy0, sy1) {
        return (t) => {
            this.#ySkew = sy0 + (sy1 - sy0) * t
        }
    }

    /**
     * Returns a mutation to change the transparancy of the entire sketch,
     * where "0" is fully transparent and "1" is fully opaque.
     * 
     * @param {number} a0 - The initial alpha
     * @param {number} a1 - The target alpha
     * @returns A mutation to change the sketch alpha
     */
    setAlpha(a0, a1) {
        return (t) => {
            this.#alpha = a0 + (a1 - a0) * t
        }
    }

    /**
     * The internal render call.  Used by the timeline to draw a sketch onto
     * a canvas or buffer.  This should not be called directly.  Instead,
     * override the "render" method on subclasses.
     * 
     * @param {CanvasRenderingContext2D} ctx - The internal graphics context to draw the sketch onto
     */
    async _renderInternal(ctx) {
        ctx.save()
        ctx.transform(
            this.#xScale,
            this.#ySkew,
            this.#xSkew,
            this.#yScale,
            this.#x,
            this.#y
        )
        ctx.rotate(this.#rotation)
        ctx.globalAlpha = this.#alpha
        await this.render(ctx)
        ctx.restore()
    }

    /**
     * The render method should be overriden by subclasses.  It defines how
     * to translate the state of the sketch onto a canvas or buffer.
     * 
     * @param {CanvasRenderingContext2D} _ctx - The graphics context to draw the sketch onto
     */
    async render(_ctx) {
        throw new Error(`You must define a "render" method on class "${this.constructor.name}"`)
    }
}
