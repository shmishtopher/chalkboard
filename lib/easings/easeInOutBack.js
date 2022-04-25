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
 * The easeInOutBack function interpolates the values [0..1] according to a 
 * wind-up function.  Eases in and out (starts slow, accelerates, then slows 
 * down).
 * 
 * @param {number} t - A value in the range [0..1]
 * @returns {number} The input value applied to a wind-up easing
 */
export default function easeInOutBack(t) {
    const a = 2.5949095

    return t < 0.5
        ? Math.pow(2 * t, 2) * ((a + 1) * 2 * t - a) / 2
        : Math.pow(2 * t - 2, 2) * ((a + 1) * (t * 2 - 2) + 2) / 2
}
