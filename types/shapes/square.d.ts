export default class Square extends Sketch {
    static CENTER: any;
    static CORNER: any;
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
    constructor(config?: {
        x: number;
        y: number;
        xScale: number;
        yScale: number;
        xSkew: number;
        ySkew: number;
        rotation: number;
        alpha: number;
    }, size?: number, fillColor?: string, strokeWidth?: number, strokeColor?: string, strokeDashArray?: number[], strokeDashOffset?: number, drawMode?: any | any);
    /**
     * Returns a mutation to set the size of a square.  Takes an initial size
     * and a target size.
     *
     * @param {number} s0 - The initial size of the square, in pixels
     * @param {number} s1 - The final size of the square, in pixels
     * @returns {(t: number) => void} A mutation to se the size of the square
     */
    setSize(s0: number, s1: number): (t: number) => void;
    /**
     * Returns a mutation to set the size of the stroke width.  Takes an
     * initial width and a target width.
     *
     * @param {number} w0 - The initial width of the square
     * @param {number} w1 - The final width of the square
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
    setStrokeWidth(w0: number, w1: number): (t: number) => void;
    /**
     * Returns a mutationt that "draws" the stroke path of the the square by
     * using the dash array and dash offset of the square.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the square
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
//# sourceMappingURL=square.d.ts.map