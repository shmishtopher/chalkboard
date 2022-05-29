export default class Rectangle extends Sketch {
    static CENTER: any;
    static CORNER: any;
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
    constructor(config?: {
        x: number;
        y: number;
        xScale: number;
        yScale: number;
        xSkew: number;
        ySkew: number;
        rotation: number;
        alpha: number;
    }, width?: number, height?: number, fillColor?: string, strokeWidth?: number, strokeColor?: string, strokeDashArray?: number[], strokeDashOffset?: number, drawMode?: rectangle.CENTER | rectangle.CORNER);
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
    setSize(w0: number, h0: number, w1: number, h1: number): (t: number) => void;
    /**
     * Returns a mutation that sets the width of the rectangle.  Takes an
     * initial width and target width.
     *
     * @param {number} w0 - The initial width of the rectangle
     * @param {number} w1 - The final width of the rectangle
     * @returns {(t: number) => void} A mutation to set the width of the rectangle
     */
    setWidth(w0: number, w1: number): (t: number) => void;
    /**
     * Returns a mutation thats sets the height of the rectangle. Takes an
     * initial height and target height.
     *
     * @param {number} h0 - The initial height of the rectangle, in pixels
     * @param {number} h1 - The target height of the rectangle, in pixels
     * @returns
     */
    setHeight(h0: number, h1: number): (t: any) => void;
    /**
     * Returns a mutation to set the size of the stroke width.  Takes an
     * initial width and a target width.
     *
     * @param {number} w0 - The initial width of the rectangle
     * @param {number} w1 - The final width of the rectangle
     * @returns {(t: number) => void} A mutation to set the stroke width
     */
    setStrokeWidth(w0: number, w1: number): (t: number) => void;
    /**
     * Returns a mutationt that "draws" the stroke path of the the rectangle by
     * using the dash array and dash offset of the rectangle.
     *
     * @returns {(t: number) => void} A mutation to draw the outline of the rectangle
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
//# sourceMappingURL=rectangle.d.ts.map