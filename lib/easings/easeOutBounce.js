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

/**
 * The easeOutBounce function interpolates the values [0..1] according to a 
 * bounce function.  Eases out (starts fast and decelerates).
 * 
 * @param {number} t - A value in the range [0..1]
 * @returns {number} The input value applied to a bounce easing
 */
export default function easeOutBounce(t) {
    const a = 7.5625
    const b = 2.75

    if (t < 1 / b) {
        return a * t ** 2
    } else if (t < 2 / b) {
        return a * (t -= 1.5 / b) * t + 0.75
    } else if (t < 2.5 / b) {
        return a * (t -= 2.25 / b) * t + 0.9375
    } else {
        return a * (t -= 2.625 / b) * t + 0.984375
    }
}
