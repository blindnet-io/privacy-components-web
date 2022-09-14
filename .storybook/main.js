const { importMetaAssets } = require('@web/rollup-plugin-import-meta-assets');
const { storybookRollupPlugin } = require('../stories/lib/markdown.cjs');

module.exports = {
  stories: [
    '../README.md',
    '../stories-build/**/*.stories.{js,md,mdx}',
    '../CONTRIBUTING.md',
    '../CHANGELOG.md',
  ],
  rollupConfig(config) {
    // Replace Modern Web plugin MD support with plain markdown support
    config.plugins = config.plugins.filter(plugin => plugin.name !== 'md');
    config.plugins.unshift(storybookRollupPlugin());

    return config;
  },
};
