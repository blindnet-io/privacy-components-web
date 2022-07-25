<h1 align="center">
  blindnet devkit<br />
  Privacy Components for the web
</h1>

<p align=center><img src="https://user-images.githubusercontent.com/7578400/163277439-edd00509-1d1b-4565-a0d3-49057ebeb92a.png#gh-light-mode-only" height="80" /></p>
<p align=center><img src="https://user-images.githubusercontent.com/7578400/163549893-117bbd70-b81a-47fd-8e1f-844911e48d68.png#gh-dark-mode-only" height="80" /></p>

<p align="center">
  <strong>Collection of Web Components helping developers to execute privacy-by-design and privacy UX.</strong>
</p>

<p align="center">
  <a href="https://blindnet.dev"><strong>blindnet.dev</strong></a>
</p>

<p align="center">
  <!-- FIXME -->
  <!-- <a href="https://blindnet.dev/docs">Documentation</a>  -->
  <!-- &nbsp;•&nbsp; -->
  <a href="https://github.com/blindnet-io/{project-short-name}/issues">Submit an Issue</a>
  &nbsp;•&nbsp;
  <a href="https://join.slack.com/t/blindnet/shared_invite/zt-1arqlhqt3-A8dPYXLbrnqz1ZKsz6ItOg">Online Chat</a>
  <br>
  <br>
</p>

## Components

The Privacy Components for the web are implemented as a collection of web components, with associated npm packages.

| Component             | Npm Package            | Purpose               |
| --------------------- | ---------------------- | --------------------- |
| `<bldn-priv-request>` | @blindnet/priv-request | Make privacy requests |
| 🚧 👷                 | _and more soon..._        |                       |

<!-- FIXME: ## Get Started

:rocket: Check out our [Quick Start Guide](https://blindnet.dev/docs/quickstart) to get started in a snap. -->

## Installation

Use [npm][npm] or [yarn][yarn] to install the component you need:

```bash
npm i @blindnet/<component-name>
```

For example:

```bash
npm i @blindnet/priv-request
```

## Usage

<!-- FIXME: 📑 The API reference of {type of project, e.g. this SDK} is available on [blindnet.dev](https://blindnet.dev/docs/api_reference/[path-to-project}/latest). -->

To use a component, simply import the associated package, and add the associated custom element to your document:

```html
<script type="module">
  import '@blindnet/<package-name>';
</script>

<bldn-selector></bldn-selector>
```

For example, when using the `priv-request` component:

```html
<script type="module">
  import '@blindnet/priv-request/bldn-priv-request.js';
</script>

<bldn-priv-request></bldn-priv-request>
```

## Community

> All community participation is subject to blindnet’s [Code of Conduct][coc].

Stay up to date with new releases and projects, learn more about how to protect your privacy and that of our users, and share projects and feedback with our team.

- [Join our Slack Workspace][chat] to chat with the blindnet community and team
- Follow us on [Twitter][twitter] to stay up to date with the latest news
- Check out our [Openness Framework][openness] and [Product Management][product] on Github to see how we operate and give us feedback.

## Contributing

> This collection of web components follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

Contributions of all kinds are always welcome!

If you see a bug or room for improvement in this project in particular, please [open an issue][new-issue] or directly [fork this repository][fork] to submit a Pull Request.

If you have any broader questions or suggestions, just open a simple informal [DevRel Request][request], and we'll make sure to quickly find the best solution for you.

### Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
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

## License

The blindnet devkit Privacy Components for the Web project is available under [MIT][license] (and [here](https://github.com/blindnet-io/openness-framework/blob/main/docs/decision-records/DR-0001-oss-license.md) is why).

<!-- project's URLs -->

[new-issue]: https://github.com/blindnet-io/privacy-components-web/issues/new/choose
[fork]: https://github.com/blindnet-io/privacy-components-web/fork

<!-- Tools -->

[npm]: https://docs.npmjs.com/
[yarn]: https://yarnpkg.com/

<!-- common URLs -->

[devkit]: https://github.com/blindnet-io/blindnet.dev
[openness]: https://github.com/blindnet-io/openness-framework
[product]: https://github.com/blindnet-io/product-management
[request]: https://github.com/blindnet-io/devrel-management/issues/new?assignees=noelmace&labels=request%2Ctriage&template=request.yml&title=%5BRequest%5D%3A+
[chat]: https://join.slack.com/t/blindnet/shared_invite/zt-1arqlhqt3-A8dPYXLbrnqz1ZKsz6ItOg
[twitter]: https://twitter.com/blindnet_io
[docs]: https://blindnet.dev/docs
[changelog]: CHANGELOG.md
[license]: LICENSE
[coc]: https://github.com/blindnet-io/openness-framework/blob/main/CODE_OF_CONDUCT.md
