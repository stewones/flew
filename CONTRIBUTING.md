# Contributing

Contributions, issues and feature requests are very welcome. If you are using this package and fixed a bug for yourself, please consider submitting a PR!

## Guidelines

If you are planning to submit a pull request, it's very important follow these basic rules:

### Commit messages

Commit messages should follow the [commit message convention](https://conventionalcommits.org/) so that changelogs can be automatically generated. Commit messages will be automatically validated upon commit.

### General guidelines

- The master branch is basically just a snapshot of the latest stable release. All development should be done in dedicated branch. **Do not submit PRs against the master branch.**
- Checkout a topic branch from the relevant branch, e.g. `dev`, and merge back against that branch.
- Work in the **src** folder of respective package and **DO NOT** checkin dist in the commits.
- It's OK - and a very nice thing - to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging.

### If adding a new feature:

- Make sure that all tests are running as expected
- Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it.

## Setup

### Pre-requisites

- *Node:* `^10.11.0`

### Install

```bash
git clone https://github.com/ionfire/reactive-record.git
cd reactive-record
```

### Dev Setup

- npm install
- `npm run build:p` (or `:w` for watch)
- `cd dist/reactive-record`
- `npm link`
  
### Try locally

- cd `your-awesome-app`
- `npm link @ionfire/reactive-record`
- import stuff and do amazing things

### Running tests

- `cd reactive-record`
- `npm run test` (or `test:w` for watch)
- see the `coverage` folder generated