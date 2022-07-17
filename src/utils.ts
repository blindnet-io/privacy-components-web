import { ACTION } from './priv.js';

export function getAllowedActions(excludedActions: string): ACTION[] {
  const exclActions = excludedActions
    .split(',')
    .map(s => s.toLocaleLowerCase());
  return Object.values(ACTION).filter(
    a =>
      !exclActions.includes(a.toLocaleLowerCase()) &&
      !a.includes('TRANSPARENCY.')
  );
}
