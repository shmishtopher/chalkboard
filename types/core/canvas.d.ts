export default class Canvas extends Sketch {
    /**
     * Constructs a new Canvas.  Use a canvas when you need to animate a scene
     * that doesn't have a better suited module.  The canvas can be used to
     * animate anything, though it is generally easier to use a named module.
     * Note theat the painter function may be async.
     *
     * @param {Sketch.defaultConfig} config - Sketch configuration object
     * @param {(ctx: CanvasRenderingContext2D, t: number) => void | Promise<void>} painter - Instructions for drawing the scene using the canvas API.  Takes a graphics context and a timestep in the range [0..1], representing progress
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
    }, painter?: (ctx: CanvasRenderingContext2D, t: number) => void | Promise<void>);
    /**
     * Returns a mutation that updates the timestep of the canvas animation.
     * Assume that "t" is in the range [0..1].  You probably don't want to
     * override this method.  Instead, pass a custom easing in the timeline.
     *
     * @returns {(t: number) => void} A mutation to update the timestep of a canvas animation
     */
    animate(): (t: number) => void;
    #private;
}
import Sketch from "./sketch.js";
//# sourceMappingURL=canvas.d.ts.map