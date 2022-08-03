// eslint-disable-next-line import/no-extraneous-dependencies
import { execa } from 'execa';

/**
 *
 * @param {string} cwd
 */
export const getLernaBinary = async cwd => {
  const { stdout } = await execa('yarn', ['bin', 'lerna'], { cwd });
  return stdout;
};

/** @typedef {'publish' | 'version' | 'bootstrap' | 'list'| 'changed' | 'diff' | 'exec' | 'run' | 'init' | 'add' | 'clean' | 'import'| 'link' | 'create'} LernaCommand */

/**
 *
 * @param {string} cwd
 * @param {*} defaultOptions
 * @returns
 */
export const createLernaRunner = async (cwd, defaultOptions) => {
  const bin = await getLernaBinary(cwd);
  /**
   * @param {LernaCommand} cmd
   * @param {string[]} [args]
   */
  return async (
    cmd,
    args = [],
    options = {}
  ) =>
    execa(bin, [cmd, ...args], {
      stdio: 'inherit',
      ...defaultOptions,
      ...options,
    });
};
