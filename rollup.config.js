import * as path from 'path';
import { glob } from 'glob';

import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import { getSortedPackages } from './tasks/sorted-packages.js';
import {
  genBaseBundleConfig,
  configFromImportMaps,
  directories,
  clean,
} from './tasks/rollup-base-config.js';

/**
 * @typedef {import("rollup").RollupOptions} RollupOptions
 * @typedef {import("yargs-parser").Arguments} CommandLineArgs
 */

/**
 * @param {CommandLineArgs} commandLineArgs
 *
 * @return {Promise<RollupOptions[]>}
 */
async function main(commandLineArgs) {
  // add config specific command line options
  const { configScope, configIgnore, configRaw, configKeep, configHelp } =
    commandLineArgs;

  if (configHelp) {
    // eslint-disable-next-line no-console
    console.log(`Rollup: Specific config options

--configHelp      Print this help message.                                            [boolean]
--configScope     (Lerna) Include only packages with names matching the given glob.   [string]
--configIgnore    (Lerna) Exclude packages with names matching the given glob.        [string]
--configRaw       Only run raw (no-blundling) build.                                  [boolean]
--configKeep      Skip output directory cleaning before build.                        [boolean]
`);
    process.exit(0);
  }

  const packages = await getSortedPackages(configScope, configIgnore);

  return packages.flatMap(pkg => {
    /**
     * Absolute path to package directory
     */
    const basePath = path.relative(__dirname, pkg.location);

    const { external, paths } = configFromImportMaps({ basePath });
    const baseBundleConfig = genBaseBundleConfig(basePath);

    const rawInputs = glob.sync('**/*.ts', {
      cwd: path.join(basePath, directories.source),
      absolute: true,
    });

    return [
      // raw (no-bundling) esm build and typings for npm
      {
        input: rawInputs,
        external,
        output: [
          {
            dir: path.join(basePath, directories.output),
            format: 'esm',
            sourcemap: true,
            assetFileNames: 'assets/[name].[ext]',
            preserveModules: true,
            preserveModulesRoot: path.join(basePath, directories.source),
          },
        ],
        plugins: [
          ...(configKeep ? [] : [clean(basePath)]),
          typescript({
            compilerOptions: {
              declaration: true,
              declarationDir: path.join(basePath, directories.output),
              rootDir: path.join(basePath, directories.source),
            },
          }),
        ],
      },
      ...(configRaw
        ? []
        : [
            // bundle with bare import specifiers for external dependencies
            // can be used with unpkg very experimental ?module option
            {
              ...baseBundleConfig,
              external,
              output: [
                {
                  // @ts-ignore
                  ...baseBundleConfig.output[0],
                  file: path.join(
                    basePath,
                    directories.output,
                    'index.core.min.js'
                  ),
                },
              ],
            },
            // bundle with all dependencies
            // Warning: heavy file, only use when using a single component in a simple HTML page
            {
              ...baseBundleConfig,
              output: [
                {
                  // @ts-ignore
                  ...baseBundleConfig.output[0],
                  file: path.join(
                    basePath,
                    directories.output,
                    'index.all.min.js'
                  ),
                },
              ],
              plugins: [
                nodeResolve(),
                // @ts-ignore
                ...baseBundleConfig.plugins
              ],
            },
            // bundle with external dependencies pointing to unpkg
            // can be used as an alternative to unpkg's very experimental ?module option, or when self hosting the bundle
            {
              ...baseBundleConfig,
              external,
              output: [
                {
                  // @ts-ignore
                  ...baseBundleConfig.output[0],
                  file: path.join(
                    basePath,
                    directories.output,
                    'index.mapped.min.js'
                  ),
                  paths,
                },
              ],
              plugins: [
                // rollup-plugin-import-map doesn't recognize generic maps and isn't actively maintained
                // see: https://github.com/trygve-lie/rollup-plugin-import-map/issues/14
                // see the paths function instead
                // rollupImportMapPlugin(path.join(basePath, 'import-map.json')),
                ...baseBundleConfig.plugins,
              ],
            },
          ]),
    ];
  });
}

export default main;
