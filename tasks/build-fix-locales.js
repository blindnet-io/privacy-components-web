/* eslint-disable consistent-return */
/* eslint-disable no-console */
import fs from 'fs-extra';

const packages = fs.readdirSync('./packages');

packages.forEach(pack => {
  const localeFiles = fs.readdirSync(
    `./packages/${pack}/dist/generated/locales`
  );
  localeFiles
    .filter(f => f.endsWith('.js'))
    .forEach(localeFile => {
      const result = fs
        .readFileSync(
          `./packages/${pack}/dist/generated/locales/${localeFile}`,
          'utf-8'
        )
        .replace(
          "'lit'",
          "'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module'"
        )
        .replace(
          "'@lit/localize'",
          "'https://unpkg.com/@lit/localize@latest/lit-localize.js?module'"
        );
      fs.writeFile(
        `./packages/${pack}/dist/generated/locales/${localeFile}`,
        result,
        'utf8',
        err => {
          if (err) return console.log(err);
        }
      );
    });
});
