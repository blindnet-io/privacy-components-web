import { msg } from '@lit/localize';
import { html } from 'lit';

/**
 * Mapping of PRIV Actions to corresponding titles.
 */
const ACTION_TITLES = {
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
    'TRANSPARENCY.PROCESSING-CATEGORIES': () => msg('TRANSPARENCY.PROCESSING-CATEGORIES'),
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
const ACTION_DESCRIPTIONS = {
    ACCESS: () => msg('Access my data'),
    DELETE: () => msg('Have my data deleted'),
    MODIFY: () => msg('Modify or complement my data'),
    OBJECT: () => msg('Object to processing of my data'),
    PORTABILITY: () => msg('Take my data and have it transfered somewhere else'),
    RESTRICT: () => msg('Restrict processing of my data to a particular scope'),
    'REVOKE-CONSENT': () => msg('Revoke previously given consent for data processing'),
    TRANSPARENCY: () => msg('Demand information related to data processing practices and know if the system has data on me'),
    'OTHER-DEMAND': () => msg('Do or know something else'),
    'TRANSPARENCY.DATA-CATEGORIES': () => msg('The categories of the data the organization has on me'),
    'TRANSPARENCY.DPO': () => msg('The contact details of the data protection officer'),
    'TRANSPARENCY.KNOWN': () => msg('If the organization has data on me'),
    'TRANSPARENCY.LEGAL-BASES': () => msg('The legal bases for processing my data (including legitimate interests)'),
    'TRANSPARENCY.ORGANIZATION': () => msg('The identity and contact details of the organization processing my data'),
    'TRANSPARENCY.POLICY': () => msg('The policies applied to processing of data concerning me'),
    'TRANSPARENCY.PROCESSING-CATEGORIES': () => msg('The cateogories of processing being done on the data the organization has on me'),
    'TRANSPARENCY.PROVENANCE': () => msg('The sources that the data concerning me come from'),
    'TRANSPARENCY.PURPOSE': () => msg('The purpose of the processing of the data the organization has on me'),
    'TRANSPARENCY.RETENTION': () => msg('For how long the data concerning me kept'),
    'TRANSPARENCY.WHERE': () => msg('Where the data about me is stored'),
    'TRANSPARENCY.WHO': () => msg('Who can access the data that the organization has on me'),
};
const PROVENANCE_DESCRIPTIONS = {
    '*': () => msg('All provenances'),
    USER: () => msg('The data is provided by a user of the system (potentially the Data Subject)'),
    'USER.DATA-SUBJECT': () => msg('The data is provided by the Data Subject'),
    DERIVED: () => msg('The data is derived from users actions, extracted from other data or inferred'),
    TRANSFERRED: () => msg('The data is obtained by transfer from another System'),
};
const DATA_CATEGORY_TITLES = {
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
const DATA_CATEGORY_DESCRIPTIONS = {
    '*': () => msg(html `<b
        >ALL information related to data processing practices and know if the
        organization has data on me</b
      >`),
    AFFILIATION: () => msg(html `<b>AFFILIATION data:</b> Groups and Organisations I am linked to
        through work, studies, or membership`),
    'AFFILIATION.MEMBERSHIP': () => msg(html ``),
    'AFFILIATION.MEMBERSHIP.UNION': () => msg(html ``),
    'AFFILIATION.SCHOOL': () => msg(html ``),
    'AFFILIATION.WORKPLACE': () => msg(html ``),
    BEHAVIOR: () => msg(html `<b>BEHAVIOR data:</b> Data about my behavior`),
    'BEHAVIOR.ACTIVITY': () => msg(html ``),
    'BEHAVIOR.CONNECTION': () => msg(html ``),
    'BEHAVIOR.PREFERENCE': () => msg(html ``),
    'BEHAVIOR.TELEMETRY': () => msg(html ``),
    BIOMETRIC: () => msg(html `<b>BIOMETRIC data</b>`),
    CONTACT: () => msg(html `<b>CONTACT data:</b> Data allowing to contact me `),
    'CONTACT.EMAIL': () => msg(html ``),
    'CONTACT.ADDRESS': () => msg(html ``),
    'CONTACT.PHONE': () => msg(html ``),
    DEMOGRAPHIC: () => msg(html `<b>DEMOGRAPHIC data:</b> All information allowing to class me in a
        demographic category`),
    'DEMOGRAPHIC.AGE': () => msg(html ``),
    'DEMOGRAPHIC.BELIEFS': () => msg(html ``),
    'DEMOGRAPHIC.GENDER': () => msg(html ``),
    'DEMOGRAPHIC.ORIGIN': () => msg(html ``),
    'DEMOGRAPHIC.RACE': () => msg(html ``),
    'DEMOGRAPHIC.SEXUAL-ORIENTATION': () => msg(html ``),
    DEVICE: () => msg(html `<b>DEVICE data:</b> Data about the device I used`),
    FINANCIAL: () => msg(html `<b>FINANCIAL data:</b> Payment data, financial history and data about
        my financial situation`),
    'FINANCIAL.BANK-ACCOUNT': () => msg(html ``),
    GENETIC: () => msg(html `<b>GENETIC data</b>`),
    HEALTH: () => msg(html `<b>HEALTH data:</b> Data about my health`),
    IMAGE: () => msg(html `<b>IMAGE data:</b> Any graphic representation (e.g., image, video) of
        me`),
    LOCATION: () => msg(html `<b>LOCATION data:</b> Geographic location`),
    NAME: () => msg(html `<b>NAME data:</b> First names, last names, nicknames, and other names`),
    PROFILING: () => msg(html `<b>PROFILING data:</b> Any data establishing a degree of similarity
        of with others (e.g., clusters, user-profiles)`),
    RELATIONSHIPS: () => msg(html `<b>RELATIONSHIPS data:</b> Data about relationships I have with
        others, social activity and interaction`),
    UID: () => msg(html `<b>Unique Identifier data:</b> Any data allowing to uniquely identify
        me`),
    'UID.ID': () => msg(html ``),
    'UID.IP': () => msg(html ``),
    'UID.USER-ACCOUNT': () => msg(html ``),
    'UID.SOCIAL-MEDIA': () => msg(html ``),
    'OTHER-DATA': () => msg(html `<b>OTHER-DATA:</b> possibility to specify within a message if needed`),
};
const TARGET_DESCRIPTIONS = {
    '*': () => msg(html `All targets`),
    SYSTEM: () => msg(html `This system`),
    ORGANIZATION: () => msg(html `This system and all systems within this organization`),
    PARTNERS: () => msg(html `This system, all systems within this organization, and all partners
        systems where data has been <b>shared or obtained</b>`),
    'PARTNERS.DOWNWARD': () => msg(html `This system, all systems within this organization, and all partners
        systems with which data has been <b>shared</b>`),
    'PARTNERS.UPWARD': () => msg(html `This system, all systems within this organization, and all partners
        systems from which data has been <b>obtained</b>`),
};
const STATUS_DESCRIPTIONS = {
    IN_PROCESSING: () => msg(html `In processing`),
    PARTIALLY_COMPLETED: () => msg(html `Partially completed`),
    COMPLETED: () => msg(html `Completed`),
    CANCELED: () => msg(html `Canceled`),
};
const DEMAND_STATUS_DESCRIPTIONS = {
    GRANTED: () => msg('Granted'),
    DENIED: () => msg('Denied'),
    'PARTIALLY-GRANTED': () => msg('Partially Granted'),
    'UNDER-REVIEW': () => msg('Under Review'),
    CANCELED: () => msg('Canceled'),
};
const POLICY_TYPE_TITLES = {
    'NO-LONGER-THAN': () => msg('no longer than'),
    'NO-LESS-THAN': () => msg('no less than'),
};
const AFTER_TITLES = {
    'CAPTURE-DATE': () => msg('capture date'),
    'RELATIONSHIP-START': () => msg('relationship start'),
    'RELATIONSHIP-END': () => msg('relationship end'),
    'SERVICE-START': () => msg('service start'),
    'SERVICE-END': () => msg('service end'),
};

export { ACTION_DESCRIPTIONS, ACTION_TITLES, AFTER_TITLES, DATA_CATEGORY_DESCRIPTIONS, DATA_CATEGORY_TITLES, DEMAND_STATUS_DESCRIPTIONS, POLICY_TYPE_TITLES, PROVENANCE_DESCRIPTIONS, STATUS_DESCRIPTIONS, TARGET_DESCRIPTIONS };
//# sourceMappingURL=dictionary.js.map
