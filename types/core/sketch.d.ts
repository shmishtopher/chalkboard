export default class Sketch {
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
    static defaultConfig: {
        x: number;
        y: number;
        xScale: number;
        yScale: number;
        xSkew: number;
        ySkew: number;
        rotation: number;
        alpha: number;
    };
    /**
     * Constructs a new Sketch.  In general, you should not be doing this.
     * Instead, instantiate a class that extends "Sketch" or use the "Canvas"
     * class.
     *
     * @param {Sketch.defaultConfig} config - Configuration object
     */
    constructor(config: {
        x: number;
        y: number;
        xScale: number;
        yScale: number;
        xSkew: number;
        ySkew: number;
        rotation: number;
        alpha: number;
    });
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
    translate(x0: number, y0: number, x1: number, y1: number): (t: number) => void;
    /**
     * Returns a mutation that translates the sketch along the x-axis from an
     * initial x position to a target x position.
     *
     * @param {number} x0 - The initial x coordinate, in pixels
     * @param {number} x1 - The target x coordinate, in pixels
     * @returns {(t: number) => void} A mutation to translate the sketch along the x-axis
     */
    translateX(x0: number, x1: number): (t: number) => void;
    /**
     * Returns a mutation that translates the sketch along the y-axis from an
     * initial y position to a target y position.
     *
     * @param {number} y0 - The initial y coordinate, in pixels
     * @param {number} y1 - The target y coordinate, in pixels
     * @returns {(t: number) => void} A mutation to transslate the sketch along the y-axis
     */
    translateY(y0: number, y1: number): (t: number) => void;
    /**
     * Returns a mutation that rotates the sketch from an initial angle to a
     * target angle
     *
     * @param {number} r0 - The initial rotation, in radians
     * @param {number} r1 - The target rotation, in radians
     * @returns {(t: number) => void} A mutation to rotate the sketch
     */
    rotate(r0: number, r1: number): (t: number) => void;
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
    scale(sx0: number, sy0: number, sx1: number, sy1: number): (t: any) => void;
    /**
     * Returns a mutation to scale the sketch along the x-axis from an
     * initial scale to a target scale.
     *
     * @param {number} sx0 - The initial x scale
     * @param {number} sx1 - The target x scale
     * @returns A mutation to scale the sketch along the x-axis
     */
    scaleX(sx0: number, sx1: number): (t: any) => void;
    /**
     * Returns a mutation to scale the sketch along the y-axis from an
     * initial scale to a target scale.
     *
     * @param {number} sy0 - The initial y scale
     * @param {number} sy1 - The target y scale
     * @returns A mutation to scale the sketch along the y-axis
     */
    scaleY(sy0: number, sy1: number): (t: any) => void;
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
    skew(sx0: number, sy0: number, sx1: number, sy1: number): (t: any) => void;
    /**
     * Returns a mutation to skew the sketch along the x-axis from an
     * initial skew to a target skew.
     *
     * @param {number} sx0 - The initial x skew
     * @param {number} sx1 - The target x skew
     * @returns A mutation to skew the sketch along the x-axis
     */
    skewX(sx0: number, sx1: number): (t: any) => void;
    /**
     * Returns a mutation to skew the sketch along the y-axis from an
     * initial skew to a target skew.
     *
     * @param {number} sy0 - The initial y skew
     * @param {number} sy1 - The target y skew
     * @returns A mutation to skew the sketch along the y-axis
     */
    skewY(sy0: number, sy1: number): (t: any) => void;
    /**
     * Returns a mutation to change the transparancy of the entire sketch,
     * where "0" is fully transparent and "1" is fully opaque.
     *
     * @param {number} a0 - The initial alpha
     * @param {number} a1 - The target alpha
     * @returns A mutation to change the sketch alpha
     */
    setAlpha(a0: number, a1: number): (t: any) => void;
    /**
     * The internal render call.  Used by the timeline to draw a sketch onto
     * a canvas or buffer.  This should not be called directly.  Instead,
     * override the "render" method on subclasses.
     *
     * @param {CanvasRenderingContext2D} ctx - The internal graphics context to draw the sketch onto
     */
    _renderInternal(ctx: CanvasRenderingContext2D): Promise<void>;
    /**
     * The render method should be overriden by subclasses.  It defines how
     * to translate the state of the sketch onto a canvas or buffer.
     *
     * @param {CanvasRenderingContext2D} _ctx - The graphics context to draw the sketch onto
     */
    render(_ctx: CanvasRenderingContext2D): Promise<void>;
    #private;
}
//# sourceMappingURL=sketch.d.ts.map