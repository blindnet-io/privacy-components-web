import { createLernaRunner } from './lerna-runner.js';

async function generateImportMaps() {
  const lerna = await createLernaRunner();
  await lerna('exec', [
    'importly --host=unpkg --lookup=unpkg --semver=minor < package.json > import-map.json',
  ]);
}

generateImportMaps();
