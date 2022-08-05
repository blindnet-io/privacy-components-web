## Contributing

The _Privacy Components for the web_ project is based on a monorepository where web components are delivered as separate npm packages and CDN bundles as part of the [blindnet devkit](https://blindnet.dev), following [open-wc](https://open-wc.org) recommendations, and using [modern-web](https://modern-web.dev) tools along with [Lerna](https://lerna.js.org/), [Classic Yarn](https://classic.yarnpkg.com) and [Rollup](https://rollupjs.org).

This guide is here to help you master all parts of our development workflow, so you can help us make the _Privacy Components for the web_ even better.

### Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

### Localization

To generate translation files for each locale, run

```bash
npm run localize
```

### Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

### Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

### Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
