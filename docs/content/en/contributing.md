---
title: Contributing
description: ''
position: 3
category: 'Getting Started'
---

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of code
- Submitting a fix
- Proposing new features
- Adding undocumented info
- Adding new examples
- Becoming a maintainer

We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the [documentation](https://github.com/intenseloop/flew/tree/master/docs/content/en).
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## MIT Software License

Any contributions you make will be under the MIT Software License. In short, when you submit code changes, your submissions are understood to be under the same [MIT License](https://github.com/intenseloop/flew/blob/master/LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern. By contributing, you agree that your contributions will be licensed under its MIT License.

## Report bugs using [Github's issues](https://github.com/intenseloop/flew/issues/new/choose)

Report a bug by [opening a new issue](https://github.com/intenseloop/flew/issues/new/choose). it's that easy!

Write bug reports with detail, background, and sample code. [This is a great example](http://stackoverflow.com/q/12488905/180626) of a bug report. Here's [another example from Craig Hockenberry](http://www.openradar.me/11905408).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can. [Like this stackoverflow question](http://stackoverflow.com/q/12488905/180626) includes sample code that _anyone_ can reproduce
- What you expected would happen
- What actually happens. Possibly including why you think this might be happening, or stuff you tried that didn't work

People _love_ thorough bug reports.

## Working with packages

- clone this respository
- issue `npm install`
- add unit tests to `__tests__` folder inside a package
- issue `npm run test` from inside the package

## Working with examples

- clone this respository
- issue `npm install`
- cd to the specific example
- issue `npm install`
- issue `npm run start`

> Note that every time you change some package code and wat it to be reflected in a project, you must run `npm run build` from inside the package.

## Working with docs

- clone this respository
- cd to `docs`
- issue `npm install`
- issue `npm run start`
