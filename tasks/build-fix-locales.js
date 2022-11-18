/* eslint-disable consistent-return */
/* eslint-disable no-console */
import fs from 'fs-extra';

// TODO: Delete separate case for core once we move components out of core package

const packages = fs.readdirSync('./packages');

packages.forEach(pack => {
  const localeFiles = fs.readdirSync(
    pack === 'core'
      ? `./packages/${pack}/dist/components/generated/locales`
      : `./packages/${pack}/dist/generated/locales`
  );
  localeFiles
    .filter(f => f.endsWith('.js'))
    .forEach(localeFile => {
      const result = fs
        .readFileSync(
          pack === 'core'
            ? `./packages/${pack}/dist/components/generated/locales/${localeFile}`
            : `./packages/${pack}/dist/generated/locales/${localeFile}`,
          'utf-8'
        )
        .replace("'lit'", "'https://unpkg.com/lit@latest/index.js?module'")
        .replace(
          "'@lit/localize'",
          "'https://unpkg.com/@lit/localize@latest/lit-localize.js?module'"
        );
      fs.writeFile(
        pack === 'core'
          ? `./packages/${pack}/dist/components/generated/locales/${localeFile}`
          : `./packages/${pack}/dist/generated/locales/${localeFile}`,
        result,
        'utf8',
        err => {
          if (err) return console.log(err);
        }
      );
    });
});
