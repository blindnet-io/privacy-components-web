import { Demand } from '../models/demand.js';
import {
  ACTION,
  DATA_CATEGORY,
  PROVENANCE,
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
          privacy_scope: {
            // Default is all the non-subcategory access options
            dc: new Set<DATA_CATEGORY>(
              Object.values(DATA_CATEGORY).filter(dc => !dc.includes('.'))
            ),
          },
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
