# esjson
JSON Schema validator (cli)

![CI](https://img.shields.io/github/workflow/status/Marcisbee/esjson/CI?style=flat-square)
[![npm version](https://img.shields.io/npm/v/esjson.svg?style=flat-square)](https://www.npmjs.com/package/esjson)
[![npm downloads](https://img.shields.io/npm/dm/esjson.svg?style=flat-square)](https://www.npmjs.com/package/esjson)
[![gzip bundle size](https://img.shields.io/bundlephobia/minzip/esjson?style=flat-square)](https://bundlephobia.com/result?p=esjson)


## Command line interface
Install esjson with npm to use the command line interface:

```bash
npm install esjson -g
```

Validate a file like so:

```bash
esjson file.json --schema=schema.json
```

## Options

```
Usage: esjson [file] [options]

file     file to parse; otherwise uses stdin

Options:
   -v, --version            print version and exit
   -s, --schema             validate json according to schema
   -e, --extensions         array of file paths to include (default: *.json)
   -a, --allow              rules for definitions and keys to allow (example: additionalProperties:name:MyDefinition)
```

# Motivation

Some of the already existing tools were not good enough for my use case (e.g. validating large list of definitions and returning quite specific errors was impossible with other json schema validators out there). So I just built my own. It does not fully comply with spec __yet__, but I'm planning to add features from spec as the time goes!

Also there is little to none documentation. If you really want to use this tool, then open an issue requesting detailed documentation, I'll see what I can put together.

# MIT License
Copyright (C) 2020 Marcis Bergmanis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
