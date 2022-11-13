/* eslint-disable no-console */
import fs from 'fs-extra';
import path from 'path';
import { __dirname } from './dirname.js';
import { getSortedPackages } from './sorted-packages.js';

const rootDir = path.resolve(__dirname(import.meta.url), '..');
const bundleDirPath = path.resolve(rootDir, 'build');

/**
 * @param {string[]} destSubDir Path to the destination subdirectory in bundleDirPath
 * @param {boolean} keepPkgDirName Add the package base directory name to the destination path
 * @param {string[] | string} scope A list of globs to match the package name against
 * @param {string[] | string} [ignore] A list of globs to filter the package name against
 * @param {string[]} [srcSubDir] Path to the subdirectory to copy in each package
 * @param {boolean} [showPrivate] When false, filter out private packages
 * @returns {Promise<void[]>}
 */
async function copyPkgsToBundle(
  destSubDir,
  keepPkgDirName,
  scope,
  ignore,
  srcSubDir = [],
  showPrivate = true
) {
  const packages = await getSortedPackages(scope, ignore, showPrivate);

  return Promise.all(
    packages.map(pkg => {
      const distPath = path.join(pkg.location, ...srcSubDir);
      const pkgDirName = path.basename(pkg.location);
      const destPath = path.join(
        bundleDirPath,
        ...destSubDir,
        keepPkgDirName ? pkgDirName : ''
      );
      console.log(`copying ${distPath} to ${destPath}`);

      return fs.copy(distPath, destPath);
    })
  );
}

function main() {
  // clean bundle directory
  fs.rmSync(bundleDirPath, { recursive: true, force: true });

  // run all copies in parallel
  return Promise.all([
    // copy builded demos
    copyPkgsToBundle(
      ['demos'],
      true,
      '@blindnet-demos/*',
      '@blindnet-demos/static',
      ['dist']
    ),

    // copy static demos
    copyPkgsToBundle(['demos'], true, '@blindnet-demos/*static*'),

    // copy public packages
    copyPkgsToBundle(['packages'], true, '@blindnet/*', [], ['dist'], false),

    // copy storybook build to the root of the bundle
    fs.copy(path.resolve(rootDir, 'storybook-static'), bundleDirPath),
  ]);
}

main().then(
  () => {
    console.log('all files copied');
  },
  reason => {
    console.error(reason);
    process.exit(1);
  }
);
