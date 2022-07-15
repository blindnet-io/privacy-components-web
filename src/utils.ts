import { action } from './dictionary.js';

export function getAllowedActions(
  excludedActions: string
): { NAME: string; DESCRIPTION: string }[] {
  const exclActions = excludedActions
    .split(',')
    .map(s => s.toLocaleLowerCase());
  return Object.values(action).filter(
    a => !exclActions.includes(a.NAME.toLocaleLowerCase())
  );
}
