/* eslint-disable import/no-extraneous-dependencies */

// Lerna tools
import { getPackages } from '@lerna/project';

// INTERNAL Lerna tools
// may be subject to unexpected changes as they aren't maintained with the community in mind
import { filterPackages } from '@lerna/filter-packages';
import batchPackages from '@lerna/batch-packages';

/**
 * @param {string} [scope] - specific scope of the packages to build
 * @param {string} [ignore] - specific packages to ignore
 *
 * @returns {Promise<string[]>} - sorted list of Package objects that represent packages to be built.
 */
 export async function getSortedPackages(scope, ignore) {
  const packages = await getPackages(__dirname);
  const filtered = filterPackages(packages, scope, ignore, false);

  return batchPackages(filtered).reduce((arr, batch) => arr.concat(batch), []);
}
