# Contributing Guide

> This is adapted from [Vue.js's contributing guide](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md).

Hi! I’m really excited that you are interested in contributing to Vue-infinite-loading. Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

- [Code of Conduct](https://github.com/PeachScript/vue-infinite-loading/blob/master/.github/CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)

## Issue Reporting Guidelines

- The issue list of this repo is **exclusively** for bug reports and feature requests.

- Try to search for your issue, it may have already been answered or even fixed in the development version.

- Check if the issue is reproducible with the latest stable version of Vue-infinite-loading. If you are using a pre-release, please indicate the specific version you are using.

- It is **required** that you clearly describe the steps necessary to reproduce the issue you are running into. Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

- Use only the minimum amount of code necessary to reproduce the unexpected behavior. A good bug report should isolate specific methods that exhibit unexpected behavior and precisely define how expectations were violated. What did you expect the method or methods to do, and how did the observed behavior differ? The more precisely you isolate the issue, the faster we can investigate.

- Issues with no clear repro steps will not be triaged. If an issue labeled "need repro" receives no further input from the issue author for more than 5 days, it will be closed.

- It is recommended that you make a JSFiddle/JSBin/Codepen to demonstrate your issue. You could start with [this template](https://jsfiddle.net/PeachScript/qax0dbnc/) that already includes the latest version of Vue-infinite-loading.

- If your issue is resolved but still open, don’t hesitate to close it. In case you found a solution by yourself, it could be helpful to explain how you fixed it.

## Pull Request Guidelines

- Checkout a topic branch from the `master` branch, and merge back against it.

- Work in the `src` folder and **DO NOT** checkin `dist` in the commits.

- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging.

- Make sure `npm test` passes. (see [development setup](#development-setup))

- If adding new feature:
  - Add accompanying test case.
  - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it.

- If fixing a bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.
  - Provide detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

## Development Setup

You will need [Node.js](http://nodejs.org) **version 6+** installed.

After cloning the repo, run:

``` bash
$ npm install # or yarn
```

### Committing Changes

Commit messages should follow the [commit message convention](./COMMIT_CONVENTION.md) so that changelogs can be automatically generated. Commit messages will be automatically validated upon commit.

### Commonly used NPM scripts

``` bash
# run dev-server
$ npm run dev

# lint code
$ npm run lint

# run the test suite
$ npm test
```

There are some other scripts available in the `scripts` section of the `package.json` file.

**Please make sure to have test pass successfully before submitting a PR.** Although the same tests will be run against your PR on the CI server, it is better to have it working locally beforehand.

## Project Structure

- **`dist`**: contains built file for distribution. Note this directory is only updated when a release happens; they do not reflect the latest changes in development.

- **`docs`**: contains documentation. Powered by [Vuepress](https://github.com/vuejs/vuepress).

- **`src`**: contains the source code, obviously. The codebase is written in ES2015.

  - **`components`**: contains code for the core single-file component (`InfiniteLoading.vue`) and spinner single-file component (`Spinner.vue`).

  - **`styles`**: contains code for styles of different spinners, they are written with [Less](http://lesscss.org/).

  - **`config.js`**: contains all the runtime configurations for this plugin.

  - **`utils.js`**: contains all the tool functions for this plugin.

  - **`index.js`**: entry file, contains plugin `install` API definition and the logic to register `InfiniteLoading` component.

- **`scripts`**: contains all the scripts use to developing, testing, building and deploying documentation.

- **`test`**: contains unit tests. They are written with [Mocha](https://mochajs.org/) and run with [Karma](https://karma-runner.github.io/2.0/index.html).

- **`types`**: contains TypeScript type definitions.
