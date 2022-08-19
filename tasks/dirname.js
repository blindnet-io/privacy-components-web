import path from 'path';
import { fileURLToPath } from 'url';

/**
 *
 * @param {string} metaURL
 * @returns {string}
 */
export function __dirname(metaURL) {
  const __filename = fileURLToPath(metaURL);
  return path.dirname(__filename);
}
