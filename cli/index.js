#!/usr/bin/env node

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

import { program } from "commander"
import preview from "./preview.js"
import render from "./render.js"

program
    .name("chalkboard")
    .version("1.0.0")

program
    .command("preview <source>")
    .description("Use ffplay to create a preview of an animation without generating a video file on disk")
    .option("-f, --fullscreen", "display the preview in a borderless fullscreen window", false)
    .option("-l, --loop", "continue looping the animation from the begining", false)
    .action(preview)

program
    .command("render <source> <output>")
    .description("Use ffmpeg to generate a full-quality animation and write it to disk")
    .action(render)

program.parseAsync()
