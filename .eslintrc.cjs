const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const fg = require('fast-glob');

const { packages: workspaces } = require('./package.json').workspaces;

const projectDirs = workspaces
  .flatMap(pattern => fg.sync(pattern, { onlyDirectories: true }))
  .filter(projectPath =>
    fs.existsSync(path.join(__dirname, projectPath, 'package.json'))
  );

const devDependencies = [
  '**/test/**/*.{html,js,mjs,ts}',
  '**/stories/**/*.{html,js,mjs,ts}',
  '**/*.config.{html,js,mjs,ts}',
  '**/*.conf.{html,js,mjs,ts}',
];

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['@open-wc', 'prettier'],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [...devDependencies, 'tasks/*.js'],
      },
    ],
  },
  // eslint-plugin-import should support yarn workspaces, but still, apparently not
  // from https://github.com/import-js/eslint-plugin-import/issues/1913#issuecomment-1034025709
  // see https://github.com/import-js/eslint-plugin-import/issues/1174
  overrides: projectDirs.map(projectDir => ({
    files: [`${projectDir}/**/*.{t,j}s`],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies,
          packageDir: [__dirname, path.join(__dirname, projectDir)],
        },
      ],
    },
  })),
};
