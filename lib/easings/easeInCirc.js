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
 * The easeInCirc function interpolates the values [0..1] according to a 
 * circular function.  Eases in (starts slow and accelerates).
 * 
 * @param {number} t - A value in the range [0..1]
 * @returns {number} The input value applied to a circular easing
 */
export default function easeInCirc(t) {
    return 1 - Math.sqrt(1 - t ** 2)
}
