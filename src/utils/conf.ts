import { ACTION } from '../models/priv-terms.ts';

export const enabledActions = new Map<ACTION, boolean>([
  [ACTION.ACCESS, false],
  [ACTION.DELETE, false],
  [ACTION.MODIFY, false],
  [ACTION.OBJECT, false],
  [ACTION.PORTABILITY, false],
  [ACTION.RESTRICT, false],
  [ACTION.REVOKE, false],
  [ACTION.TRANSPARENCY, true],
  [ACTION.OTHER_DEMAND, false],
]);
