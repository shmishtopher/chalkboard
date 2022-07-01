export default class Ellipse extends Sketch {
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
    constructor(config?: {
        x: number;
        y: number;
        xScale: number;
        yScale: number;
        xSkew: number;
        ySkew: number;
        rotation: number;
        alpha: number;
    }, radiusX?: number, radiusY?: number, fillColor?: string, strokeWidth?: number, strokeColor?: string, strokeDashArray?: number[], strokeDashOffset?: number);
    /**
     * Returns a mutation to set the x-radius of an ellipse.  Takes an initial
     * radius and a target radius.
     *
     * @param {number} r0 - The initial x-radius of the ellipse, in pixels
     * @param {number} r1 - The final x-radius of the ellipse, in pixels
     * @returns {(t: number) => void} A mutation to se the x-radius of the ellipse
     */
    setRadiusX(r0: number, r1: number): (t: number) => void;
    /**
     * Returns a mutation to set the y-radius of an ellipse.  Takes an initial
     * radius and a target radius.
     *
     * @param {number} r0 - The initial y-radius of the ellipse, in pixels
     * @param {number} r1 - The final y-radius of the ellipse, in pixels
     * @returns {(t: number) => void} A mutation to se the y-radius of the ellipse
     */
    setRadiusY(r0: number, r1: number): (t: number) => void;
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
    setRadius(rx0: number, ry0: number, rx1: number, ry1: number): (t: number) => void;
    /**
     * Returns a mutation to set the size of the stroke width.  Takes an
     * initial width and a target width.
     *
     * @param {number} w0 - The initial width of the ellipse
     * @param {number} w1 - The final width of the ellipse
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
    setStrokeWidth(w0: number, w1: number): (t: number) => void;
    /**
     * Returns a mutationt that "draws" the stroke path of the the ellipse by
     * using the dash array and dash offset of the ellipse.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the ellipse
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
//# sourceMappingURL=ellipse.d.ts.map