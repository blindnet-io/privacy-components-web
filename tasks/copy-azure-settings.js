/* eslint-disable no-console */
/**
 * Copy azure settings to enable client routing
 */

import fs from 'fs-extra';
import process from 'node:process';

fs.copy(
  './azure/staticwebapp.config.json',
  `./build/staticwebapp.config.json`
).then(console.log, e => {
  console.error(e);
  process.exitCode = 1;
});
