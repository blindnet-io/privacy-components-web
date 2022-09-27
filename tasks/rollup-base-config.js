// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import * as fs from 'fs';

import filesizePlugin from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import { optimize as optimizeSVG } from 'svgo';

/**
 * @typedef {import("rollup").RollupOptions} RollupOptions
 */

export const directories = {
  output: 'dist',
  source: 'src',
  reports: 'stats',
};

/**
 *
 * @param {{ basePath: string, forceSkypack?: boolean}} param0
 * @returns
 */
export function configFromImportMaps({ basePath, forceSkypack = false }) {
  const { imports } = JSON.parse(
    fs.readFileSync(path.join(basePath, 'import-map.json'), 'utf8')
  );

  const external = Object.keys(imports).map(module =>
    module.endsWith('/') ? new RegExp(`^${module}(.*)`) : module
  );

  const dirImports = Object.entries(imports).filter(([module]) =>
    module.endsWith('/')
  );

  return {
    /**
     * transform import-map to rollup output.paths config format to replace bare module specifiers with CDN URLs
     *
     * @see https://rollupjs.org/guide/en/#outputpaths
     *
     * @param {string} id
     * @returns {string}
     */
    paths: id => {
      let newUrl;
      const exactURLMatch = imports[id];
      if (exactURLMatch) {
        newUrl = exactURLMatch;
      } else {
        const dirMatch = dirImports.find(([module]) => id.startsWith(module));
        if (dirMatch && dirMatch.length > 0) {
          const [bareModule, remoteUrl] = dirMatch;
          newUrl = id.replace(bareModule, remoteUrl);
        }
      }

      if (!newUrl) {
        // eslint-disable-next-line no-console
        console.error(`No path found for ${id}`);
        return id;
      }

      let urlSuffix = '';

      const newURLObj = new URL(newUrl);

      // importly only supports unpkg and jsdelivr for now
      if (forceSkypack) {
        // WARNING: lit doesn't seem to work with skypack
        // see https://github.com/lit/lit/issues/2383
        // should work with unpkg, untested with jsdelivr
        newURLObj.hostname = 'cdn.skypack.dev';
        urlSuffix = '?min';
      } else if (newURLObj.hostname === 'unpkg.com') {
        // see https://unpkg.com/#query-params
        urlSuffix = '?module';
      } else if (newURLObj.hostname === 'cdn.jsdelivr.net') {
        // WARNING: untested with importly
        // see https://www.jsdelivr.com/esm
        urlSuffix = '+esm';
      }

      return `${newURLObj.href}${urlSuffix}`;
    },
    /**
     * mark all imports matching the project's import map as external to avoid warnings*
     *
     * @see https://rollupjs.org/guide/en/#external
     */
    external,
  };
}

export function filesize() {
  return filesizePlugin({
    showMinifiedSize: false,
    showBrotliSize: true,
  });
}

/**
 * clean output directory (only run for the first build)
 * @param {string} basePath
 */
export function clean(basePath) {
  return del({ targets: `${basePath}/${directories.output}/*` });
}

/**
 * importMetaAssets plugin with svg optimization using SVGO
 */
export function importAndOptimizeMetaAssets() {
  return importMetaAssets({
    // workaround for plugin's incorrect typings
    include: undefined,
    warnOnError: false,
    // exclude all dependencies for performance optimization
    // @blindnet dependencies like @blindnet/core might need to be included in the future
    exclude: 'node_modules/**',
    transform: (
      /** @type {Buffer} */ assetBuffer,
      /** @type {string} */ assetPath
    ) => {
      if (assetPath.endsWith('.svg')) {
        const result = optimizeSVG(assetBuffer.toString());
        if ('data' in result) {
          return result.data;
        }
        // eslint-disable-next-line no-console
        console.error(new Error(result.error));
      }

      return assetBuffer;
    },
  });
}

/**
 * base config for bundled esm build for CDN$
 *
 * @param {string} basePath
 * @returns {RollupOptions}
 */
export function genBaseBundleConfig(basePath) {
  return {
    input: path.join(basePath, directories.source, 'index.ts'),
    output: [
      {
        format: 'esm',
        sourcemap: true,
        assetFileNames: 'assets/[name].[ext]',
      },
    ],
    plugins: [
      typescript({
        compilerOptions: {
          declaration: false,
          declarationDir: undefined,
          rootDir: path.join(basePath, directories.source),
        },
      }),
      importAndOptimizeMetaAssets(),
      terser({
        output: { comments: false },
      }),
      minifyHTML(),
      filesize(),
    ],
  };
}
