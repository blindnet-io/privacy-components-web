/* eslint-disable no-console */
/**
 * Copy our lit-localize config to each package
 */

import fs from 'fs-extra';
import process from 'node:process';

Promise.all(
  fs
    .readdirSync('./packages')
    .map(async pkg =>
      fs.copy(
        './localization/lit-localize.json',
        `./packages/${pkg}/lit-localize.json`
      )
    )
).then(console.log, e => {
  console.error(e);
  process.exitCode = 1;
});
