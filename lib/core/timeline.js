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

export default class Timeline {
    #events = []
    #duration = 0

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
    add(start, duration, easing, mutation) {
        this.#events.push({ start, duration, easing, mutation })
        this.#duration = Math.max(this.#duration, start + duration)

        return this
    }

    /**
     * Adds a new event to the timeline starting immediately after the previous
     * ends.  Applies a mutation with an easing.
     * 
     * @param {number} duration - The duration of the animation, in milliseconds
     * @param {(t: number) => number} easing - The easing function to apply to the mutation
     * @param {(t: number) => void} mutation - The mutation to apply over time
     * @returns {Timeline} Returns self for chaining
     */
    then(duration, easing, mutation) {
        const lastEvent = this.#events.at(-1)
        const start = (lastEvent?.start ?? 0) + (lastEvent?.duration ?? 0)
        this.#events.push({ start, duration, easing, mutation })
        this.#duration = Math.max(this.#duration, start + duration)

        return this
    }

    /**
     * Adds an event to the timeline that applies "1" to a mutation at a given
     * time.
     * 
     * @param {number} start - The time to set the sketch value, in milliseconds
     * @param {(t: number) => void} mutation - The mutation to apply instantly
     * @returns {Timeline} Returns self for chaining
     */
    set(time, mutation) {
        this.#events.push({
            start: time,
            duration: 0,
            easing: () => {},
            mutation,
        })

        return this
    }

    /**
     * Adds a "set" event to the timeline immediately after the previous event
     * ends.  Applys "1" to a mutation.
     * 
     * @param {(t: number) => void} mutation - The mutation to apply instantly
     * @returns {Timeline} Returns self for chaining
     */
    thenSet(mutation) {
        const lastEvent = this.#events.at(-1)
        const start = (lastEvent?.start ?? 0) + (lastEvent?.duration ?? 0)

        this.#events.push({
            start,
            duration: 0,
            easing: () => {},
            mutation,
        })

        return this
    }

    /**
     * Gets the total runtime of the animation, in milliseconds.
     * 
     * @returns {number} The maximum duration of this timeline
     */
    getDuration() {
        return this.#duration
    }

    /**
     * Seeks the timeline to a timestamp, in milliseconds.  Applies all the
     * mutations, in order, from earliest to latest up to the seek point.
     * 
     * @param {number} t - The time to seek to, in milliseconds
     */
    seek(t) {
        for (const event of this.#events) {
            if (event.start <= t) {
                if (event.duration > 0) {
                    const progress = Math.min(1, (t - event.start) / event.duration)
                    event.mutation(event.easing(progress))
                } else {
                    event.mutation(1)
                }
            }
        }
    }
}
