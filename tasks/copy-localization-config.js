/**
 * Copy our lit-localize config to each package
 */

import fs from 'fs-extra';

fs.readdirSync('./packages').forEach(pkg => {
  fs.copySync(
    './localization/lit-localize.json',
    `./packages/${pkg}/lit-localize.json`
  );
});
