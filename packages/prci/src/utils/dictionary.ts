import { msg } from '@lit/localize';

/**
 * Mapping of PRIV Actions to corresponding titles.
 */
export const ACTION_TITLES = {
  ACCESS: () => msg('ACCESS'),
  DELETE: () => msg('DELETE'),
  MODIFY: () => msg('MODIFY'),
  OBJECT: () => msg('OBJECT'),
  PORTABILITY: () => msg('PORTABILITY'),
  RESTRICT: () => msg('RESTRICT'),
  'REVOKE-CONSENT': () => msg('REVOKE-CONSENT'),
  TRANSPARENCY: () => msg('TRANSPARENCY'),
  'TRANSPARENCY.DATA-CATEGORIES': () => msg('TRANSPARENCY.DATA-CATEGORIES'),
  'TRANSPARENCY.DPO': () => msg('TRANSPARENCY.DPO'),
  'TRANSPARENCY.KNOWN': () => msg('TRANSPARENCY.KNOWN'),
  'TRANSPARENCY.LEGAL-BASES': () => msg('TRANSPARENCY.LEGAL-BASES'),
  'TRANSPARENCY.ORGANIZATION': () => msg('TRANSPARENCY.ORGANIZATION'),
  'TRANSPARENCY.POLICY': () => msg('TRANSPARENCY.POLICY'),
  'TRANSPARENCY.PROCESSING-CATEGORIES': () =>
    msg('TRANSPARENCY.PROCESSING-CATEGORIES'),
  'TRANSPARENCY.PROVENANCE': () => msg('TRANSPARENCY.PROVENANCE'),
  'TRANSPARENCY.PURPOSE': () => msg('TRANSPARENCY.PURPOSE'),
  'TRANSPARENCY.RETENTION': () => msg('TRANSPARENCY.RETENTION'),
  'TRANSPARENCY.WHERE': () => msg('TRANSPARENCY.WHERE'),
  'TRANSPARENCY.WHO': () => msg('TRANSPARENCY.WHO'),
  'OTHER-DEMAND': () => msg('OTHER-DEMAND'),
};

/**
 * Mapping of PRIV Actions to corresponding descriptions.
 */
export const ACTION_DESCRIPTIONS = {
  ACCESS: () => msg('Access my data'),
  DELETE: () => msg('Have my data deleted'),
  MODIFY: () => msg('Modify or complement my data'),
  OBJECT: () => msg('Object to processing of my data'),
  PORTABILITY: () => msg('Take my data and have it transfered somewhere else'),
  RESTRICT: () => msg('Restrict processing of my data to a particular scope'),
  'REVOKE-CONSENT': () =>
    msg('Revoke previously given consent for data processing'),
  TRANSPARENCY: () =>
    msg(
      'Demand information related to data processing practices and know if the system has data on me'
    ),
  'OTHER-DEMAND': () => msg('Do or know something else'),
  'TRANSPARENCY.DATA-CATEGORIES': () =>
    msg('The categories of the data the organization has on me'),
  'TRANSPARENCY.DPO': () =>
    msg('The contact details of the data protection officer'),
  'TRANSPARENCY.KNOWN': () => msg('If the organization has data on me'),
  'TRANSPARENCY.LEGAL-BASES': () =>
    msg(
      'The legal bases for processing my data (including legitimate interests)'
    ),
  'TRANSPARENCY.ORGANIZATION': () =>
    msg(
      'The identity and contact details of the organization processing my data'
    ),
  'TRANSPARENCY.POLICY': () =>
    msg('The policies applied to processing of data concerning me'),
  'TRANSPARENCY.PROCESSING-CATEGORIES': () =>
    msg(
      'The cateogories of processing being done on the data the organization has on me'
    ),
  'TRANSPARENCY.PROVENANCE': () =>
    msg('The sources that the data concerning me come from'),
  'TRANSPARENCY.PURPOSE': () =>
    msg('The purpose of the processing o the data the organization has on me'),
  'TRANSPARENCY.RETENTION': () =>
    msg('For how long the data concerning me kept'),
  'TRANSPARENCY.WHERE': () => msg('Where the data about me is stored'),
  'TRANSPARENCY.WHO': () =>
    msg('Who can access the data that the organization has on me'),
};

export const PROVENANCE_DESCRIPTIONS = {
  USER: () =>
    msg(
      'The data is provided by a user of the system (potentially the Data Subject)'
    ),
  'USER.DATA-SUBJECT': () => msg('The data is provided by the Data Subject'),
  DERIVED: () =>
    msg(
      'The data is derived from users actions, extracted from other data or inferred'
    ),
  TRANSFERRED: () =>
    msg('The data is obtained by transfer from another System'),
};
