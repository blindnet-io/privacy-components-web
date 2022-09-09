import { html } from 'lit';
import { Demand } from '../models/demand.js';
import {
  ACTION,
  AFTER,
  DATA_CATEGORY,
  POLICY_TYPE,
  PROCESSING_CATEGORY,
  PROVENANCE,
  PURPOSE,
  TARGET,
} from '../models/priv-terms.js';
import { PRCI_CONFIG } from './conf.js';
import {
  AFTER_TITLES,
  DATA_CATEGORY_TITLES,
  POLICY_TYPE_TITLES,
} from './dictionary.js';

export function getDefaultActions() {
  return Object.values(ACTION).filter(a => !a.includes('TRANSPARENCY.'));
}

export function getDefaultDemand(action: ACTION): Demand {
  switch (action) {
    case ACTION.ACCESS:
      return {
        action,
        restrictions: {
          privacy_scope: PRCI_CONFIG['access-allowed-data-categories']
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

    case ACTION.DELETE:
      return {
        action,
        restrictions: {
          privacy_scope: PRCI_CONFIG['delete-allowed-data-categories']
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

    case ACTION.REVOKE:
      return {
        action,
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

/**
 * Get a user friendly string for a retention policy
 * @param dataCategory Data category the policy pertains to
 * @param policy Type of the policy
 * @param duration String quantifying the duration, e.g. 10 months
 * @param after Point after which the data is kept
 * @returns String combining the provided information to represent a retention policy
 */
export function getRetentionPolicyString(
  dataCategory: DATA_CATEGORY,
  policyType: POLICY_TYPE,
  duration: string,
  after: AFTER
) {
  // FIXME: For our first demo, we assume duration is in months
  return html`<i>${DATA_CATEGORY_TITLES[dataCategory]().toLocaleUpperCase()}</i>
    data is kept <i>${POLICY_TYPE_TITLES[policyType]().toLocaleUpperCase()}</i>
    <i>${duration}</i> months after
    <i>${AFTER_TITLES[after]().toLocaleUpperCase()}</i>`;
}
