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

| Component             | Npm Package        | Purpose               |
| --------------------- | ------------------ | --------------------- |
| `<bldn-priv-request>` | @blindnet/prci     | Make privacy requests |
| 🚧 👷                 | _and more soon..._ |                       |

<!-- FIXME: ## Get Started

:rocket: Check out our [Quick Start Guide](https://blindnet.dev/docs/quickstart) to get started in a snap. -->

## Installation & Usage

### CDN

Embedding the Privacy Components for the web into your website can be done by just adding a simple script to your HTML document.

We recommend using the Unpkg CDN for even more simplicity and better performance.

For example, if you want to display the PRCI component on your web page, just add the following script tag:

```html
<script
  src="https://unpkg.com/@blindnet/prci/dist/index.core.min.js?module"
  type="module"
></script>
```

And add the associated custom element to the page:

```html
<bldn-priv-request></bldn-priv-request>
```

### Npm/Yarn

Use [npm][npm] or [yarn][yarn] to install the component you need:

```bash
npm i @blindnet/<component-name> # for example @blindnet/prci
# OR
yarn add @blindnet/<component-name>
```

To use a component, simply import the associated package, and add the associated custom element to your document.

For example, when using the `PRCI` component:

```html
<script type="module">
  import '@blindnet/priv-request/prci';
</script>

<bldn-priv-request></bldn-priv-request>
```

### Advanced Usage

All privacy components for the web are delivered with four different builds to fit every need:

`/dist/index.js` (and related files):

- "raw" unbundled JavaScript files
- for testing and projects using their own build system
- _this is the version you get when importing the package into a npm project_
- _TypeScript typings are only available for this version_

`/dist/index.all.min.js`:

- self-sufficient bundle with all dependencies included

`/dist/index.mapped.min.js`:

- minimal bundle with external dependencies specified as Unpkg URLs
  (e.g. `import { html, LitElement } from 'https://unpkg.com/lit@~2.2.8/index.js?module'`)
- for self-hosting, without using a custom build system

`/dist/index.core.min.js`:

- minimal bundle with external dependencies specified as [bare module specifiers](https://html.spec.whatwg.org/multipage/webappapis.html#resolve-a-module-specifier)\
  (e.g. `import { html, LitElement } from 'lit';`)
- for direct import from the Unpkg CDN with the [`?module` option](https://unpkg.com/#query-params)

#### Import Maps

An [import map](https://github.com/WICG/import-maps) (`/import-map.json`) is provided with each component as an **example** to use with the "raw" and `core` builds to customize the URL associated with each dependency's bare module specifier.

> **Warning**
>
> You'll have to change the URLs values to use this map, as the given unpkg examples would require the `?module` option.

### Documentation

📑 Components' API reference, developer documentation, and complementary docs are provided via Storybook on [blindnet-io.github.io/privacy-components-web/](https://blindnet-io.github.io/privacy-components-web/).

> **Warning**
>
> Privacy Components for the web are still at a very early stage of development. Expect incomplete documentation and breaking changes on a regular basis.

## Community

> All community participation is subject to blindnet’s [Code of Conduct][coc].

Stay up to date with new releases and projects, learn more about how to protect your privacy and that of our users, and share projects and feedback with our team.

- [Join our Slack Workspace][chat] to chat with the blindnet community and team
- Follow us on [Twitter][twitter] to stay up to date with the latest news
- Check out our [Openness Framework][openness] and [Product Management][product] on Github to see how we operate and give us feedback.

## Contributing

Contributions of all kinds are always welcome!

If you see a bug or room for improvement in this project in particular, please [open an issue][new-issue] or directly [fork this repository][fork] to submit a Pull Request.

If you have any broader questions or suggestions, just open a simple informal [DevRel Request][request], and we'll make sure to quickly find the best solution for you.

For more information on how to contribute to this project, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

The blindnet devkit Privacy Components for the Web project is available under [MIT][license] (and [here](https://github.com/blindnet-io/openness-framework/blob/main/docs/decision-records/DR-0001-oss-license.md) is why).

<!-- project's URLs -->

[new-issue]: https://github.com/blindnet-io/privacy-components-web/issues/new/choose
[fork]: https://github.com/blindnet-io/privacy-components-web/fork

<!-- Tools -->

[npm]: https://docs.npmjs.com/
[yarn]: https://yarnpkg.com/

<!-- common URLs -->

[openness]: https://github.com/blindnet-io/openness-framework
[product]: https://github.com/blindnet-io/product-management
[request]: https://github.com/blindnet-io/devrel-management/issues/new?assignees=noelmace&labels=request%2Ctriage&template=request.yml&title=%5BRequest%5D%3A+
[chat]: https://join.slack.com/t/blindnet/shared_invite/zt-1arqlhqt3-A8dPYXLbrnqz1ZKsz6ItOg
[twitter]: https://twitter.com/blindnet_io
[license]: LICENSE
[coc]: https://github.com/blindnet-io/openness-framework/blob/main/CODE_OF_CONDUCT.md
