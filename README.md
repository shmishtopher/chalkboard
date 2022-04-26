# chalkboard
📽️ Chalkboard is a framework for procedural video creation in JavaScript.

## Installing
Chalkboard can be installed localy or globally using npm
```
npm i shmishtopher/chalkboard
```

```
npm i -g shmishtopher/chalkboard
```

## Basic Usage
Chalkboard is both a framework for developing procedural animations in JavaScript and a utility for compiling videos.  It uses a simple, declarative timeline and a collection of mutable sketches to describe animations.  It uses ffplay, ffmpeg, and a Cairo-powered canvas implementation on the backend

### CLI Usage
The chalkboard CLI is your primary tool for viewing and rendering your chalkboard animations.  Use the following commands to get general help.
```
> chalkboard --help

Usage: chalkboard [options] [command]

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  preview [options] <source>  Use ffplay to create a preview of an animation without generating a video file on disk
  render <source> <output>    Use ffmpeg to generate a full-quality animation and write it to disk
  help [command]              display help for command
```

```
> chalkboard help preview

Usage: chalkboard preview [options] <source>

Use ffplay to create a preview of an animation without generating a video file on disk

Options:
  -f, --fullscreen  display the preview in a borderless fullscreen window (default: false)
  -l, --loop        continue looping the animation from the begining (default: false)
  -h, --help        display help for command
```

```
> chalkboard help render

Usage: chalkboard render [options] <source> <output>

Use ffmpeg to generate a full-quality animation and write it to disk

Options:
  -h, --help  display help for command
```

### Your First Animation
TODO

## Chalkboard Manual
TODO

### Table of Contents
TODO
