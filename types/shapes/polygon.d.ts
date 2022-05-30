export default class Polygon extends Sketch {
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
    constructor(config?: {
        x: number;
        y: number;
        xScale: number;
        yScale: number;
        xSkew: number;
        ySkew: number;
        rotation: number;
        alpha: number;
    }, sides?: number, radius?: number, fillColor?: string, strokeWidth?: number, strokeColor?: string, strokeDashArray?: number[], strokeDashOffset?: number);
    /**
     * Returns a mutation to set the radius of a polygon.  Takes an initial
     * radius and a target radius.
     *
     * @param {number} r0 - The initial radius of the polygon, in pixels
     * @param {number} r1 - The final radius of the polygon, in pixels
     * @returns {(t: number) => void} A mutation to se the radius of the polygon
     */
    setRadius(r0: number, r1: number): (t: number) => void;
    /**
     * Returns a mutation to set the size of the stroke width.  Takes an
     * initial width and a target width.
     *
     * @param {number} w0 - The initial width of the polygon
     * @param {number} w1 - The final width of the polygon
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
    setStrokeWidth(w0: number, w1: number): (t: number) => void;
    /**
     * Returns a mutationt that "draws" the stroke path of the the polygon by
     * using the dash array and dash offset of the polygon.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the polygon
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
//# sourceMappingURL=polygon.d.ts.map