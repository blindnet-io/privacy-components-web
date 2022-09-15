# Localization

Localization for all web components is handled by [lit localize](https://lit.dev/docs/localization/overview/)

## Adding localization to a new component

After adding a new web component to this repository, e.g. `packages/new-component`, simply add the `"localize": "lit-localize extract && lit-localize build"` script to `packages/new-component/package.json`.

## Adding a new locale

To have our build script generate a translation (`translations/<locale-code>.xlf`) file for a new locale, simply add the locale code to the `targetLocales` field in [lit-localize.json](lit-localize.json) then run `yarn build:localize` or `yarn build`.

For example,

```json
"targetLocales": ["fr", "de-DE"]
```

Will cause a `de-DE.xlf` file to be generated in [translations](translations/) to which you may add german translations.

## Adding translations

Within the `translations/<locale-code>.xlf` for the language you wish to translate, for each `<source>STRING TO BE TRANSLATED</source>` add a `<target>TRANSLATED STRING</target>` below containing the translated string.

For example,

```xlf
<trans-unit id="source_string_id">
  <source>Privacy rocks!</source>
  <target>Roches de confidentialité!</target>
</trans-unit>
```

## Configuration

The [lit-localize.json](lit-localize.json) config is shared by all components (copied via the `build:localize` script). It uses mostly standard [configuration options](https://lit.dev/docs/localization/cli-and-config/), except `interchange.xliffDir` which is changed so all packages source translations from [translations](translations/).

## Note for marking localized strings

When using the `msg` function from `@lit/localize` to mark localized messages in source files, note that the wrapped string or HTML template must contain string literals (not variables) for the content to be localized. For example,

```typescript
import { msg } from '@lit/localize';

const myStringToLocalize = 'Translate this!';

const localizedString = msg(html`Translated string: ${myStringToLocalize}`);
```

This will build and run fine, but all you will see in the `<locale>.xlf` files is something like:

`<source>Translated string: <x id="0" equiv-text="${myStringToLocalize}"/></source>`

If you want to actually define a translation for the content of the variable ("Translate this!"), you must insert it directly in the string:

```typescript
const localizedString = msg(html`Translated string: Translate this!`);
```

See [this discussion](https://github.com/lit/lit/discussions/3178) for further explanation and a workaround.
