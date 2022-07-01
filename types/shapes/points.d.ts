export default class Points extends Sketch {
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
    constructor(config?: {
        x: number;
        y: number;
        xScale: number;
        yScale: number;
        xSkew: number;
        ySkew: number;
        rotation: number;
        alpha: number;
    }, points?: [number, number][], fillColor?: string, strokeWidth?: number, strokeColor?: string, strokeDashArray?: number[], strokeDashOffset?: number);
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
    setPointX(index: number, x0: number, x1: number): (t: number) => void;
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
    setPointY(index: number, y0: number, y1: number): (t: number) => void;
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
    setPoint(index: number, x0: number, y0: number, x1: number, y1: number): (t: number) => void;
    /**
     * Returns a mutation to set the size of the stroke width.  Takes an
     * initial width and a target width.
     *
     * @param {number} w0 - The initial width
     * @param {number} w1 - The final width
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
    setStrokeWidth(w0: number, w1: number): (t: number) => void;
    /**
     * Returns a mutationt that "draws" the stroke path of the the shape by
     * using the dash array and dash offset.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the shape
     */
    draw(): (t: number) => void;
    /**
     * Returns a mutation that applies a stroke color change over time.  Takes
     * a function that takes a number in [0..1] as input and returns a color
     * string.
     *
     * @param {(t: number) => string} colorFn - A function that takes numbers in the range [0..1] and returns a color string
     * @returns {(t: number) => void} A mutation to change the stroke color
     */
    setStrokeColor(colorFn: (t: number) => string): (t: number) => void;
    /**
     * Returns a mutation that applies a fill color change over time.  Takes
     * a function that takes a number in [0..1] as input and returns a color
     * string.
     *
     * @param {(t: number) => string} colorFn - A function that takes numbers in the range [0..1] and returns a color string
     * @returns {(t: number) => void} A mutation to change the fill color
     */
    setFillColor(colorFn: (t: number) => string): (t: number) => void;
    #private;
}
import Sketch from "../core/sketch.js";
//# sourceMappingURL=points.d.ts.map