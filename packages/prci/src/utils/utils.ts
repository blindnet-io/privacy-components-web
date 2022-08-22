import { Demand } from '../models/demand.js';
import {
  ACTION,
  DATA_CATEGORY,
  PROCESSING_CATEGORY,
  PROVENANCE,
  PURPOSE,
  TARGET,
} from '../models/priv-terms.js';

export function getDefaultActions() {
  return Object.values(ACTION).filter(a => !a.includes('TRANSPARENCY.'));
}

export function getDefaultDemand(action: ACTION): Demand {
  switch (action) {
    case ACTION.ACCESS:
      return {
        action: ACTION.ACCESS,
        restrictions: {
          privacy_scope: Object.values(DATA_CATEGORY)
            .filter(dc => !dc.includes('.') && !dc.includes('*'))
            .map(dc => ({
              dc,
              pc: PROCESSING_CATEGORY.ALL,
              pp: PURPOSE.ALL,
            })),
          provenance: {
            term: PROVENANCE.ALL,
            target: TARGET.SYSTEM,
          },
          date_range: {},
        },
      };

    default:
      throw Error(`No default demand for action: ${action}!`);
  }
}

export function getDefaultDemands(action: ACTION): Demand[] {
  if (action === ACTION.TRANSPARENCY) {
    return Object.values(ACTION)
      .filter(a => a.includes('TRANSPARENCY.'))
      .map(a => ({
        action: a,
        restrictions: {
          provenance: {
            term: PROVENANCE.ALL,
          },
        },
      }));
  }
  throw Error('Only TRANSPARENCY action should have multiple demands!');
}
