import baseConfig from '../web-dev-server.config.mjs';
import { storybookWdsPlugin } from '../stories/lib/markdown.cjs';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  ...baseConfig,
  open: '/',
  plugins: [storybookWdsPlugin(), ...baseConfig.plugins],
});
