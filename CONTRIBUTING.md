## Contributing

The _Privacy Components for the web_ are made in a monorepository where web components are delivered as separate npm packages and CDN bundles as part of the [blindnet devkit](https://blindnet.dev).

This guide is here to help you master all parts of our development workflow, so you can help us make the _Privacy Components for the web_ even better.

> **Note**
>
> We welcome all kinds of contributions, including the non-code related ones.
>
> Just [open an issue][new-issue] or a simple informal [DevRel Request][request] anytime you have a suggestion to make or a discussion to start, and we'll make sure to quickly find the best solution for you.

## Prerequisites

This project only requires Git, [classic Yarn (v1)](https://classic.yarnpkg.com/en/docs/install#debian-stable) and [Node.js v16](https://nodejs.org/).

> **Note**
>
> We recommend using [nvm](https://github.com/nvm-sh/nvm) to install and use Node.js with this project.
>
> Just run `nvm install` (without any other option) at the root of this repository to install the recommended version of Node.js, then `nvm use` to use it.
>
> You can then the run `npm i -g yarn` to install classic Yarn in this specific version of Node.js.

## Get Started

You first need to [fork this repository](https://github.com/blindnet-io/privacy-components-web/fork) and clone your fork locally:

```bash
git clone git@github.com:{{your-username}}/privacy-components-web.git
```

Then, go to the root directory of your local clone, install the dependencies **with classic Yarn** (_Yarn 2+ and npm aren't supported_), and link local packages together [using Lerna](https://github.com/lerna/lerna/tree/main/commands/bootstrap):

> Lerna is part of this project's development dependencies, so you don't need to install it yourself.

```bash
cd privacy-components-web
yarn install
yarn lerna bootstrap
```

> **Note**
>
> We also recommend using VS Code and provide a [recommended list of extensions](https://code.visualstudio.com/docs/editor/extension-marketplace#_workspace-recommended-extensions) for it, but you can use any IDE or editor to contribute to this project.

## Storybook

The Privacy Components for the web are built with a _Visual TDD_ / _Story Driven Development_ approach in mind.

In practical terms, this means Storybook stories (along with unit tests) are the central entry point for all developments.

For more detail about how to write good stories, refer to the [Storybook for Web Components documentation](https://storybook.js.org/docs/web-components/get-started/introduction).

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Testing

This project uses the modern-web [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) to run all unit tests, and the Open-WC [Testing Package](https://open-wc.org/docs/testing/testing-package/) to ease their development.

To execute a single test run:

```bash
npm run test
```

To run the tests on packages in interactive watch mode run:

```bash
npm run test:packages:watch
```

> **Note**
>
> As our demos needs to be self-sufficient, we run their tests using their own "test" npm scripts in parallel using `lerna run`.
> However, web-test-runner [can't run in watch mode in a non-interactive (TTY) terminal](https://github.com/modernweb-dev/web/issues/19).
> This mean you can't run both packages and demos tests simultaneously in watch mode.
>
> Instead, you should go to the directory where the demo you want to contribute to is developed (e.g. `/demos/devkit-simple-tutorial`) and directly run all the specific npm scripts you want their (including `test:watch` if it exists).

## <a name="linting"></a> Linting & Formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

Linting and formatting are provided using [ESLint](https://eslint.org), [Prettier](https://prettier.io) and [Markdownlint](https://github.com/igorshubovych/markdownlint-cli).

If you only want to check or format using one of these tools, run:

- `[format|lint]:es` for ESLint
- `[format|lint]:prettier` for Prettier
- `[format|lint]:md` for Markdownlint

> **Note**
>
> Commit hooks are provided via [Husky](https://github.com/typicode/husky) to automatically check and fix the format of all staged files using [lint-staged](https://github.com/okonet/lint-staged).

## Building

To build all packages at once, just run `yarn build`.

This will run:

1. [import maps](https://github.com/WICG/import-maps) generation using [Importly](https://github.com/chase-moskal/importly/)<br/>
   `yarn run build:imports`
1. the extraction of internationalized messages and build of the localized components using [@lit/localized-tools](https://www.npmjs.com/package/@lit/localize-tools)
   `yarn run build:localize`
1. typescript compilation, bundling, and every other parts of the building process using [Rollup.js](https://rollupjs.org)
   `yarn run build:rollup`

Each script can be run independently.
However, Rollup.js requires the import maps and localization files to be generated and up to date.

To automatically rebuild the bundles when its source files change on disk, use `yarn watch`.

More options, specific to this project's configuration, can also be used to customize Rollup.js behavior when using the `build:rollup` or `watch` scripts.

For the complete list of options, run: `yarn build:rollup --configHelp`

> **Warning**
>
> This project only supports and provides [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) packages for web browsers.<br/>
> No [CJS](https://nodejs.org/docs/latest/api/modules.html), [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) or Node.js specific code/package can be used as a dependency.

## <a name="workflow"></a> Workflow & Releases

This project follows a "permissive" [gitflow](https://danielkummer.github.io/git-flow-cheatsheet/), with:

- no restriction on feature branch names whatsoever
- a `develop` branch, target of all feature / bug fix PRs
- a `main` branch, receiving merges from the develop branch on a regular basis, and hotfixes when required

Releases are **automatically** made and published to npm as follow:

- every new commit pushed to a branch associated with an open PR leads to a "canary" alpha release<br/>
  (`X.X.X-pr{{PR-Number-in-Github}}-{{short-commit-hash}}`)
- every PR merged to the `develop` branch leads to a new `beta` release<br/>
  (`X.X.X-beta.N`)
- every new commit in the `main` branch leads to a new "stable" release<br/>
  (major, minor or patch)

Version numbers follow [**semantic versioning**](https://semver.org/) and are automatically incremented based on commits messages.

## Localization

To contribute by adding translations, see [here](localization/README.md).

## <a name="commit"></a> Commit Message Guidelines

Automating releases and change log generation require following very **precise rules** over how the git commit messages can be formatted.
Which is why this project follows [conventional commits](https://www.conventionalcommits.org/) ["Angular"](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) conventions.

And furthermore, following these conventions also leads to **more readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.
The header has a special format that includes a **type**, a **scope** and a **subject**:

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters!
This allows the message to be easier to read on GitHub as well as in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **build**: Changes to local repository build system and tooling
- **ci**: Changes to CI configuration and CI specific tooling [2]
- **docs**: Changes which exclusively affects documentation.
- **feat**: Creates a new feature [1]
- **fix**: Fixes a previously discovered failure/bug [1]
- **perf**: Improves performance without any change in functionality or API [1]
- **refactor**: Refactor without any change in functionality or API (includes style changes)
- **release**: A release point in the repository [2]
- **test**: Improvements or corrections made to the project's test suite
- **chore**: Any change that doesn't fall into any of the above categories [3]

<sup>[1] This type MUST have a scope. See the next section for more information.</sup><br/>
<sup>[2] This type MUST NOT have a scope. It only applies to general scripts and tooling.</sup><br/>
<sup>[3] This type SHOULD be avoided as much as possible and especially MUST NOT be used on commit changing any production code.</sup>

### Scope

The scope should be the name of the npm package affected as perceived by the person reading changelog generated from the commit messages.

The following is the list of supported scopes:

- **@blindnet/core**
- **@blindnet/prci**
- **@blindnet/dci**
- **@blindnet-demos/devkit-simple-tutorial**
- **@blindnet-demos/static**

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- be concise and direct
- no dot (.) at the end

### Examples

Examples of valid commit messages:

- `fix(@blindnet/prci): prevent the flubber from grassing`
- `refactor(@blindnet/core): move all JSON classes together`

Examples of invalid commit messages:

- `fix(@blindnet/prci): add a new XYZ property`

  This is a feature, not a fix.

- `ci(@blindnet/core): fix publishing workflow`

  The `ci` type cannot have a scope.

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer can contain information about breaking changes and deprecations.
It is also the place to reference GitHub issues, Jira tickets, and other PRs that are related to this commit or that this commit will close.

For example:

```text
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

or

```text
DEPRECATED: <what is deprecated>
<BLANK LINE>
<deprecation description + recommended update path>
<BLANK LINE>
<BLANK LINE>
Closes #<pr number>
```

Breaking Change section should start with the phrase "BREAKING CHANGE: " followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.

Similarly, a Deprecation section should start with "DEPRECATED: " followed by a short description of what is deprecated, a blank line, and a detailed description of the deprecation that also mentions the recommended update path.

[new-issue]: https://github.com/blindnet-io/privacy-components-web/issues/new/choose
[request]: https://github.com/blindnet-io/devrel-management/issues/new?assignees=noelmace&labels=request%2Ctriage&template=request.yml&title=%5BRequest%5D%3A+
