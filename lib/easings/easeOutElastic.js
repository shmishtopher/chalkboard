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
 * The easeOutElastic function interpolates the values [0..1] according to an
 * elastic function.  Eases out (starts fast and decelerates).
 * 
 * @param {number} t - A value in the range [0..1]
 * @returns {number} The input value applied to a elastic easing
 */
export default function easeOutElastic(t) {
    const a = 2 * Math.PI / 3

    if (t === 0 || t === 1) {
        return t
    } else {
        return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * a) + 1
    }
}
