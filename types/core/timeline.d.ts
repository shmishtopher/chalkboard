export default class Timeline {
    /**
     * Adds a new event to the timeline starting at a given time and running
     * for a provided duration.  Applies a mutation with an easing.
     *
     * @param {number} start - The start time of the animation, in milliseconds
     * @param {number} duration - The duration of the animation, in milliseconds
     * @param {(t: number) => number} easing - The easing function to apply to the mutation
     * @param {(t: number) => void} mutation - The mutation to apply over time
     * @returns {Timeline} Returns self for chaining
     */
    add(start: number, duration: number, easing: (t: number) => number, mutation: (t: number) => void): Timeline;
    /**
     * Adds a new event to the timeline starting immediately after the previous
     * ends.  Applies a mutation with an easing.
     *
     * @param {number} duration - The duration of the animation, in milliseconds
     * @param {(t: number) => number} easing - The easing function to apply to the mutation
     * @param {(t: number) => void} mutation - The mutation to apply over time
     * @returns {Timeline} Returns self for chaining
     */
    then(duration: number, easing: (t: number) => number, mutation: (t: number) => void): Timeline;
    /**
     * Adds an event to the timeline that applies "1" to a mutation at a given
     * time.
     *
     * @param {number} start - The time to set the sketch value, in milliseconds
     * @param {(t: number) => void} mutation - The mutation to apply instantly
     * @returns {Timeline} Returns self for chaining
     */
    set(time: any, mutation: (t: number) => void): Timeline;
    /**
     * Adds a "set" event to the timeline immediately after the previous event
     * ends.  Applys "1" to a mutation.
     *
     * @param {(t: number) => void} mutation - The mutation to apply instantly
     * @returns {Timeline} Returns self for chaining
     */
    thenSet(mutation: (t: number) => void): Timeline;
    /**
     * Gets the total runtime of the animation, in milliseconds.
     *
     * @returns {number} The maximum duration of this timeline
     */
    getDuration(): number;
    /**
     * Seeks the timeline to a timestamp, in milliseconds.  Applies all the
     * mutations, in order, from earliest to latest up to the seek point.
     *
     * @param {number} t - The time to seek to, in milliseconds
     */
    seek(t: number): void;
    #private;
}
//# sourceMappingURL=timeline.d.ts.map