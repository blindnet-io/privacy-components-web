// @ts-ignore
import { getPackages } from '@lerna/project';

// INTERNAL Lerna tools may be subject to unexpected changes as they aren't maintained with the community in mind

// @ts-ignore
import { filterPackages } from '@lerna/filter-packages';
// @ts-ignore
import batchPackages from '@lerna/batch-packages';

import path from 'path';
import { __dirname } from './dirname.js';

/**
 * @param {string[] | string} [scope] A list of globs to match the package name against
 * @param {string[] | string} [ignore] A list of globs to filter the package name against
 * @param {boolean} [showPrivate] When false, filter out private packages
 *
 * @returns {Promise<any[]>} - sorted list of Package objects that represent packages to be built.
 */
export async function getSortedPackages(
  scope = '@blindnet/*',
  ignore,
  showPrivate = false
) {
  const packages = await getPackages(
    path.join(__dirname(import.meta.url), '..')
  );
  const filtered = filterPackages(packages, scope, ignore, showPrivate);

  return batchPackages(filtered).reduce(
    (/** @type {string | any[]} */ arr, /** @type {any} */ batch) =>
      arr.concat(batch),
    []
  );
}
