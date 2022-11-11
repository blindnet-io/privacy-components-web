/* eslint-disable consistent-return */
/* eslint-disable no-console */
import fs from 'fs-extra';

const packages = fs.readdirSync('./build/packages');

packages.forEach(pack => {
  const localeFiles = fs.readdirSync(
    `./build/packages/${pack}/generated/locales`
  );
  localeFiles
    .filter(f => f.endsWith('.js'))
    .forEach(localeFile => {
      const result = fs
        .readFileSync(
          `./build/packages/${pack}/generated/locales/${localeFile}`,
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
        `./build/packages/${pack}/generated/locales/${localeFile}`,
        result,
        'utf8',
        err => {
          if (err) return console.log(err);
        }
      );
      console.log(
        `replaced imports in ./build/packages/${pack}/generated/locales/${localeFile}`
      );
    });
});
