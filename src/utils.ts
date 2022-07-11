import { action } from './priv.js';

export function getAllowedActions(excludedActions: string) {
  const exclActions = excludedActions
    .split(',')
    .map(s => s.toLocaleLowerCase());
  return Object.values(action).filter(
    a => !exclActions.includes(a.NAME.toLocaleLowerCase())
  );
}
