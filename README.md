# README

<h1 align="center">
  Blindnet Web Modules
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
  <a href="https://blindnet.dev/docs">Documentation</a>
  &nbsp;•&nbsp;
  <a href="https://github.com/blindnet-io/{project-short-name}/issues">Submit an Issue</a>
  &nbsp;•&nbsp;
  <a href="https://join.slack.com/t/blindnet/shared_invite/zt-1arqlhqt3-A8dPYXLbrnqz1ZKsz6ItOg">Online Chat</a>
  &nbsp;•&nbsp;
  <span>Demo (<a href="https://pc4w.blindnet.dev/demos/modules/basic">Main</a> | <a href="https://stage.pc4w.blindnet.dev/demos/modules/basic">Develop</a> | <a href="https://pc4w.blindnet.dev/demos/dpo">DPO Main</a> | <a href="https://stage.pc4w.blindnet.dev/demos/dpo">DPO Develop</a>)</span>
  <br>
  <br>
</p>

## Components

The Blindnet Web Modules are implemented as a collection of web components, with associated npm packages.

| Component               | Npm Package              | Purpose                         |
| ----------------------- | ------------------------ | ------------------------------- |
| `<bldn-privacy-portal>` | @blindnet/privacy-portal | Make and track privacy requests |
| `<bldn-bridge>`         | @blindnet/bridge         | Respond to privacy requests     |
| 🚧 👷                   | _and more soon..._       |                                 |

## Get Started

:rocket: Check out our [Intro Tutorial](https://blindnet.dev/docs/tutorials/intro/) to get started in a snap.

## Installation & Usage

### CDN

You can embed the Blindnet Web Modules in your website through a script import or by including the appropriate package as a project dependency.

We recommend using the [jsdelivr](https://www.jsdelivr.com/) CDN for even more simplicity and better performance.

For example, if you want to add our Privacy Portal to your web page, just add the following script tag:

```html
<script
  src="https://cdn.jsdelivr.net/npm/@blindnet/privacy-portal/dist/index.all.min.js"
  type="module"
></script>
```

And add the associated custom element to your page:

```html
<bldn-privacy-portal></bldn-privacy-portal>
```

### Npm/Yarn

Use [npm][npm] or [yarn][yarn] to install the module you need:

```bash
npm i @blindnet/<component-name> # for example @blindnet/privacy-portal
# OR
yarn add @blindnet/<component-name>
```

To use a module, simply import the associated package, and add the associated custom element to your document.

For example, when using the `<bldn-privacy-portal>` component:

```html
<script type="module">
  import '@blindnet/privacy-portal';
</script>

<bldn-privacy-portal></bldn-privacy-portal>
```

### Advanced Usage

All modules for the web are delivered with two different builds:

`/dist/index.js` (and related files):

- "raw" unbundled JavaScript files
- for testing and projects using their own build system
- _this is the version you get when importing the package into a npm project_
- _TypeScript typings are only available for this version_

`/dist/index.all.min.js`:

- self-sufficient bundle with all dependencies included

#### Import Maps

An [import map](https://github.com/WICG/import-maps) (`/import-map.json`) is provided with each module as an **example** to use with the "raw" and `core` builds to customize the URL associated with each dependency's bare module specifier.

> **Warning**
>
> You'll have to change the URLs values to use this map, as the given unpkg examples would require the `?module` option.

### Documentation

📑 Components' API reference, developer documentation, and complementary docs are provided on [blindnet.dev](https://blindnet.dev/docs/interfaces/).

> **Warning**
>
> The blindnet web modules are still at a very early stage of development. There may be breaking changes during this period.

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

The blindnet web modules project is available under [MIT][license] (and [here](https://github.com/blindnet-io/openness-framework/blob/main/docs/decision-records/DR-0001-oss-license.md) is why).

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
