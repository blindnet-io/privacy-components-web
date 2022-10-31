import { msg } from '@lit/localize';
import { html } from 'lit';

/**
 * Mapping of PRIV Actions to corresponding titles.
 */
export const ACTION_TITLES = {
  ACCESS: () => msg('Access'),
  DELETE: () => msg('Delete'),
  MODIFY: () => msg('Modify'),
  OBJECT: () => msg('Object'),
  PORTABILITY: () => msg('Portability'),
  RESTRICT: () => msg('Restrict'),
  'REVOKE-CONSENT': () => msg('Revoke'),
  TRANSPARENCY: () => msg('Transparency'),
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
  OTHER: () => msg('Other Demand'),
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
  OTHER: () =>
    msg(
      'Do or know something else. Please note it may take longer to be answered'
    ),
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
    msg('The purpose of the processing of the data the organization has on me'),
  'TRANSPARENCY.RETENTION': () =>
    msg('For how long the data concerning me kept'),
  'TRANSPARENCY.WHERE': () => msg('Where the data about me is stored'),
  'TRANSPARENCY.WHO': () =>
    msg('Who can access the data that the organization has on me'),
};

export const PROVENANCE_DESCRIPTIONS = {
  '*': () => msg('All provenances'),
  USER: () =>
    msg(
      'The data provided by a user of the system (potentially the Data Subject)'
    ),
  'USER.DATA-SUBJECT': () => msg('The data is provided by the Data Subject'),
  DERIVED: () =>
    msg(
      'The data derived from user actions, extracted from other data or inferred'
    ),
  TRANSFERRED: () => msg('The data obtained by transfer from another System'),
};

export const PROVENANCE_DESCRIPTIONS_STATUS_VIEW = {
  '*': () => msg('All provenances'),
  USER: () => msg('Provided by a user of the system'),
  'USER.DATA-SUBJECT': () => msg('Provided by you while using the system'),
  DERIVED: () =>
    msg(
      'Derived from user actions, extracted from other data or inferred by the system'
    ),
  TRANSFERRED: () => msg('Obtained by transfer from another system'),
};

export const DATA_CATEGORY_TITLES = {
  '*': () => msg(''),
  AFFILIATION: () => msg('affiliation'),
  'AFFILIATION.MEMBERSHIP': () => msg('affiliation membership'),
  'AFFILIATION.MEMBERSHIP.UNION': () => msg(''),
  'AFFILIATION.SCHOOL': () => msg(''),
  'AFFILIATION.WORKPLACE': () => msg(''),
  BEHAVIOR: () => msg('behavior'),
  'BEHAVIOR.ACTIVITY': () => msg(''),
  'BEHAVIOR.CONNECTION': () => msg(''),
  'BEHAVIOR.PREFERENCE': () => msg(''),
  'BEHAVIOR.TELEMETRY': () => msg(''),
  BIOMETRIC: () => msg('biometric'),
  CONTACT: () => msg('contact'),
  'CONTACT.EMAIL': () => msg(''),
  'CONTACT.ADDRESS': () => msg(''),
  'CONTACT.PHONE': () => msg(''),
  DEMOGRAPHIC: () => msg('demographic'),
  'DEMOGRAPHIC.AGE': () => msg(''),
  'DEMOGRAPHIC.BELIEFS': () => msg(''),
  'DEMOGRAPHIC.GENDER': () => msg(''),
  'DEMOGRAPHIC.ORIGIN': () => msg(''),
  'DEMOGRAPHIC.RACE': () => msg(''),
  'DEMOGRAPHIC.SEXUAL-ORIENTATION': () => msg(''),
  DEVICE: () => msg('device'),
  FINANCIAL: () => msg('financial'),
  'FINANCIAL.BANK-ACCOUNT': () => msg('finacial bank account'),
  GENETIC: () => msg('genetic'),
  HEALTH: () => msg('health'),
  IMAGE: () => msg('image'),
  LOCATION: () => msg('location'),
  NAME: () => msg('name'),
  PROFILING: () => msg('profiling'),
  RELATIONSHIPS: () => msg('relationships'),
  UID: () => msg('uid'),
  'UID.ID': () => msg(''),
  'UID.IP': () => msg(''),
  'UID.USER-ACCOUNT': () => msg(''),
  'UID.SOCIAL-MEDIA': () => msg(''),
  'OTHER-DATA': () => msg('other data'),
};

export const DATA_CATEGORY_DESCRIPTIONS = {
  '*': () =>
    msg(html`<b>ALL</b> categories of data the organization has on me`),
  AFFILIATION: () =>
    msg(
      html`Groups and Organisations I am linked to through work, studies, or
      membership`
    ),
  'AFFILIATION.MEMBERSHIP': () => msg(html``),
  'AFFILIATION.MEMBERSHIP.UNION': () => msg(html``),
  'AFFILIATION.SCHOOL': () => msg(html``),
  'AFFILIATION.WORKPLACE': () => msg(html``),
  BEHAVIOR: () => msg(html`Data about my behavior`),
  'BEHAVIOR.ACTIVITY': () => msg(html``),
  'BEHAVIOR.CONNECTION': () => msg(html``),
  'BEHAVIOR.PREFERENCE': () => msg(html``),
  'BEHAVIOR.TELEMETRY': () => msg(html``),
  BIOMETRIC: () => msg(html``),
  CONTACT: () => msg(html`Data allowing to contact me `),
  'CONTACT.EMAIL': () => msg(html``),
  'CONTACT.ADDRESS': () => msg(html``),
  'CONTACT.PHONE': () => msg(html``),
  DEMOGRAPHIC: () =>
    msg(html`All information allowing to class me in a demographic category`),
  'DEMOGRAPHIC.AGE': () => msg(html``),
  'DEMOGRAPHIC.BELIEFS': () => msg(html``),
  'DEMOGRAPHIC.GENDER': () => msg(html``),
  'DEMOGRAPHIC.ORIGIN': () => msg(html``),
  'DEMOGRAPHIC.RACE': () => msg(html``),
  'DEMOGRAPHIC.SEXUAL-ORIENTATION': () => msg(html``),
  DEVICE: () => msg(html`Data about the device I used`),
  FINANCIAL: () =>
    msg(
      html`Payment data, financial history and data about my financial situation`
    ),
  'FINANCIAL.BANK-ACCOUNT': () => msg(html``),
  GENETIC: () => msg(html``),
  HEALTH: () => msg(html`Data about my health`),
  IMAGE: () => msg(html`Any graphic representation (e.g., image, video) of me`),
  LOCATION: () => msg(html`Geographic location`),
  NAME: () => msg(html`First names, last names, nicknames, and other names`),
  PROFILING: () =>
    msg(
      html`Any data establishing a degree of similarity of with others (e.g.,
      clusters, user-profiles)`
    ),
  RELATIONSHIPS: () =>
    msg(
      html`Data about relationships I have with others, social activity and
      interaction`
    ),
  UID: () => msg(html`Any data that uniquely identifies me`),
  'UID.ID': () => msg(html``),
  'UID.IP': () => msg(html``),
  'UID.USER-ACCOUNT': () => msg(html``),
  'UID.SOCIAL-MEDIA': () => msg(html``),
  'OTHER-DATA': () => msg(html`Any other categories or forms of data`),
};

export const TARGET_DESCRIPTIONS = {
  '*': () => msg(html`All targets`),
  SYSTEM: () => msg(html`This system`),
  ORGANIZATION: () =>
    msg(html`This system and all systems within this organization`),
  PARTNERS: () =>
    msg(
      html`This system, all systems within this organization, and all partners
        systems where data has been <b>shared or obtained</b>`
    ),
  'PARTNERS.DOWNWARD': () =>
    msg(
      html`This system, all systems within this organization, and all partners
        systems with which data has been <b>shared</b>`
    ),
  'PARTNERS.UPWARD': () =>
    msg(
      html`This system, all systems within this organization, and all partners
        systems from which data has been <b>obtained</b>`
    ),
};

export const STATUS_DESCRIPTIONS = {
  IN_PROCESSING: () => msg(html`In processing`),
  PARTIALLY_COMPLETED: () => msg(html`Partially completed`),
  COMPLETED: () => msg(html`Completed`),
  CANCELED: () => msg(html`Canceled`),
};

export const DEMAND_STATUS_DESCRIPTIONS = {
  GRANTED: () => msg('granted'),
  DENIED: () => msg('denied'),
  'PARTIALLY-GRANTED': () => msg('partially granted'),
  'UNDER-REVIEW': () => msg('under review'),
  CANCELED: () => msg('canceled'),
};

export const POLICY_TYPE_TITLES = {
  'NO-LONGER-THAN': () => msg('no longer than'),
  'NO-LESS-THAN': () => msg('no less than'),
};

export const AFTER_TITLES = {
  'CAPTURE-DATE': () => msg('capture date'),
  'RELATIONSHIP-START': () => msg('relationship start'),
  'RELATIONSHIP-END': () => msg('relationship end'),
  'SERVICE-START': () => msg('service start'),
  'SERVICE-END': () => msg('service end'),
};

export const PROCESSING_CATEGORY_DESCRIPTIONS = {
  '*': () => msg(''),
  ANONYMIZATION: () => msg(''),
  'AUTOMATED-INFERENCE': () => msg(''),
  'AUTOMATED-DECISION-MAKING': () => msg(''),
  COLLECTION: () => msg(''),
  GENERATING: () => msg(''),
  PUBLISHING: () => msg(''),
  STORING: () => msg(''),
  SHARING: () => msg(''),
  USING: () => msg(''),
  'OTHER-PROCESSING': () => msg(''),
};

export const PURPOSE_DESCRIPTIONS = {
  '*': () => msg(''),
  ADVERTISING: () => msg(''),
  COMPLIANCE: () => msg(''),
  EMPLOYMENT: () => msg(''),
  JUSTICE: () => msg(''),
  MARKETING: () => msg(''),
  MEDICAL: () => msg(''),
  PERSONALIZATION: () => msg(''),
  'PUBLIC-INTERESTS': () => msg(''),
  RESEARCH: () => msg(''),
  SALE: () => msg(''),
  SECURITY: () => msg(''),
  SERVICES: () => msg(''),
  'SERVICES.ADDITIONAL-SERVICES': () => msg(''),
  'SERVICES.BASIC-SERVICE': () => msg(''),
  'SOCIAL-PROTECTION': () => msg(''),
  TRACKING: () => msg(''),
  'VITAL-INTERESTS': () => msg(''),
  'OTHER-PURPOSE': () => msg(''),
};
