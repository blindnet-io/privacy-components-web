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
  'TRANSPARENCY.DATA-CATEGORIES': () => msg('Transparency - Data Categories'),
  'TRANSPARENCY.DPO': () => msg('Transparency - DPO'),
  'TRANSPARENCY.KNOWN': () => msg('Transparency - Known'),
  'TRANSPARENCY.LEGAL-BASES': () => msg('Transparency - Legal Bases'),
  'TRANSPARENCY.ORGANIZATION': () => msg('Transparency - Organization'),
  'TRANSPARENCY.POLICY': () => msg('Transparency - Policy'),
  'TRANSPARENCY.PROCESSING-CATEGORIES': () =>
    msg('Transparency - Processing Categories'),
  'TRANSPARENCY.PROVENANCE': () => msg('Transparency - Provenance'),
  'TRANSPARENCY.PURPOSE': () => msg('Transparency - Purpose'),
  'TRANSPARENCY.RETENTION': () => msg('Transparency - Retention'),
  'TRANSPARENCY.WHERE': () => msg('Transparency - Where'),
  'TRANSPARENCY.WHO': () => msg('Transparency - Who'),
  OTHER: () => msg('Other Demand'),
};

/**
 * Mapping of PRIV Actions to corresponding titles.
 */
export const ACTION_TITLES_WITH_DEMAND = {
  ACCESS: () => msg('Access Demand'),
  DELETE: () => msg('Delete Demand'),
  MODIFY: () => msg('Modify Demand'),
  OBJECT: () => msg('Object Demand'),
  PORTABILITY: () => msg('Portability Demand'),
  RESTRICT: () => msg('Restrict Demand'),
  'REVOKE-CONSENT': () => msg('Revoke Demand'),
  TRANSPARENCY: () => msg('Transparency Demand'),
  'TRANSPARENCY.DATA-CATEGORIES': () =>
    msg('Transparency - Data Categories Demand'),
  'TRANSPARENCY.DPO': () => msg('Transparency - DPO Demand'),
  'TRANSPARENCY.KNOWN': () => msg('Transparency - Known Demand'),
  'TRANSPARENCY.LEGAL-BASES': () => msg('Transparency - Legal Bases Demand'),
  'TRANSPARENCY.ORGANIZATION': () => msg('Transparency - Organization Demand'),
  'TRANSPARENCY.POLICY': () => msg('Transparency - Policy Demand'),
  'TRANSPARENCY.PROCESSING-CATEGORIES': () =>
    msg('Transparency - Processing Categories Demand'),
  'TRANSPARENCY.PROVENANCE': () => msg('Transparency - Provenance Demand'),
  'TRANSPARENCY.PURPOSE': () => msg('Transparency - Purpose Demand'),
  'TRANSPARENCY.RETENTION': () => msg('Transparency - Retention Demand'),
  'TRANSPARENCY.WHERE': () => msg('Transparency - Where Demand'),
  'TRANSPARENCY.WHO': () => msg('Transparency - Who Demand'),
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

export const TRANSPARENCY_ACTION_DESCRIPTIONS = {
  TRANSPARENCY: () =>
    msg(
      html`<b>All</b> information related to data processing practices and my
        data`
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

export const PROVENANCE_TITLES = {
  '*': () => msg(''),
  USER: () => msg('user'),
  'USER.DATA-SUBJECT': () => msg('user - data subject'),
  DERIVED: () => msg('derived'),
  TRANSFERRED: () => msg('transferred'),
};

export const PROVENANCE_DESCRIPTIONS = {
  '*': () => msg('All provenances'),
  USER: () =>
    msg(
      'The data provided by a user of the system (potentially the Data Subject)'
    ),
  'USER.DATA-SUBJECT': () => msg('The data provided by the Data Subject'),
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
  AFFILIATION: () => msg('Affiliation'),
  'AFFILIATION.MEMBERSHIP': () => msg('Affiliation - Membership'),
  'AFFILIATION.MEMBERSHIP.UNION': () => msg('Affiliation - Membership Union'),
  'AFFILIATION.SCHOOL': () => msg('Affiliation - School'),
  'AFFILIATION.WORKPLACE': () => msg('Affiliation - Workplace'),
  BEHAVIOR: () => msg('Behavior'),
  'BEHAVIOR.ACTIVITY': () => msg('Behavior - Activity'),
  'BEHAVIOR.CONNECTION': () => msg('Behavior - Connection'),
  'BEHAVIOR.PREFERENCE': () => msg('Behavior - Preference'),
  'BEHAVIOR.TELEMETRY': () => msg('Behavior - Telemetry'),
  BIOMETRIC: () => msg('Biometric'),
  CONTACT: () => msg('Contact'),
  'CONTACT.EMAIL': () => msg('Contact - Email'),
  'CONTACT.ADDRESS': () => msg('Contact - Address'),
  'CONTACT.PHONE': () => msg('Contact - Phone'),
  DEMOGRAPHIC: () => msg('Demographic'),
  'DEMOGRAPHIC.AGE': () => msg('Demographic - Age'),
  'DEMOGRAPHIC.BELIEFS': () => msg('Demographic - Beliefs'),
  'DEMOGRAPHIC.GENDER': () => msg('Demographic - Gender'),
  'DEMOGRAPHIC.ORIGIN': () => msg('Demographic - Origin'),
  'DEMOGRAPHIC.RACE': () => msg('Demographic - Race'),
  'DEMOGRAPHIC.SEXUAL-ORIENTATION': () =>
    msg('Demographic - Sexual Orientation'),
  DEVICE: () => msg('Device'),
  FINANCIAL: () => msg('Financial'),
  'FINANCIAL.BANK-ACCOUNT': () => msg('Finacial bank account'),
  GENETIC: () => msg('Genetic'),
  HEALTH: () => msg('Health'),
  IMAGE: () => msg('Image'),
  LOCATION: () => msg('Location'),
  NAME: () => msg('Name'),
  PROFILING: () => msg('Profiling'),
  RELATIONSHIPS: () => msg('Relationships'),
  UID: () => msg('UID'),
  'UID.ID': () => msg('UID - ID'),
  'UID.IP': () => msg('UID - IP'),
  'UID.USER-ACCOUNT': () => msg('UID - User Account'),
  'UID.SOCIAL-MEDIA': () => msg('UID - Social Media'),
  'OTHER-DATA': () => msg('Other'),
  'OTHER-DATA.PROOF': () => msg('Other - Proof'),
};

export const DATA_CATEGORY_TITLES_WITH_DATA = {
  '*': () => msg(''),
  AFFILIATION: () => msg('Affiliation data'),
  'AFFILIATION.MEMBERSHIP': () => msg('Affiliation - Membership data'),
  'AFFILIATION.MEMBERSHIP.UNION': () =>
    msg('Affiliation - Membership Union data'),
  'AFFILIATION.SCHOOL': () => msg('Affiliation - School data'),
  'AFFILIATION.WORKPLACE': () => msg('Affiliation - Workplace data'),
  BEHAVIOR: () => msg('Behavior data'),
  'BEHAVIOR.ACTIVITY': () => msg('Behavior - Activity data'),
  'BEHAVIOR.CONNECTION': () => msg('Behavior - Connection data'),
  'BEHAVIOR.PREFERENCE': () => msg('Behavior - Preference data'),
  'BEHAVIOR.TELEMETRY': () => msg('Behavior - Telemetry data'),
  BIOMETRIC: () => msg('Biometric data'),
  CONTACT: () => msg('Contact data'),
  'CONTACT.EMAIL': () => msg('Contact - Email data'),
  'CONTACT.ADDRESS': () => msg('Contact - Address data'),
  'CONTACT.PHONE': () => msg('Contact - Phone data'),
  DEMOGRAPHIC: () => msg('Demographic data'),
  'DEMOGRAPHIC.AGE': () => msg('Demographic - Age data'),
  'DEMOGRAPHIC.BELIEFS': () => msg('Demographic - Beliefs data'),
  'DEMOGRAPHIC.GENDER': () => msg('Demographic - Gender data'),
  'DEMOGRAPHIC.ORIGIN': () => msg('Demographic - Origin data'),
  'DEMOGRAPHIC.RACE': () => msg('Demographic - Race data'),
  'DEMOGRAPHIC.SEXUAL-ORIENTATION': () =>
    msg('Demographic - Sexual Orientation data'),
  DEVICE: () => msg('Device data'),
  FINANCIAL: () => msg('Financial data'),
  'FINANCIAL.BANK-ACCOUNT': () => msg('Finacial bank account data'),
  GENETIC: () => msg('Genetic data'),
  HEALTH: () => msg('Health data'),
  IMAGE: () => msg('Image data'),
  LOCATION: () => msg('Location data'),
  NAME: () => msg('Name data'),
  PROFILING: () => msg('Profiling data'),
  RELATIONSHIPS: () => msg('Relationships data'),
  UID: () => msg('UID data'),
  'UID.ID': () => msg('UID - ID data'),
  'UID.IP': () => msg('UID - IP data'),
  'UID.USER-ACCOUNT': () => msg('UID - User Account data'),
  'UID.SOCIAL-MEDIA': () => msg('UID - Social Media data'),
  'OTHER-DATA': () => msg('Other data'),
  'OTHER-DATA.PROOF': () => msg('Other - Proof data'),
};

export const DATA_CATEGORY_DESCRIPTIONS = {
  '*': () =>
    msg(html`<b>All</b> categories of data the organization has on me`),
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
  BIOMETRIC: () => msg(html`Data about my unique physical characteristics`),
  CONTACT: () => msg(html`Data allowing to contact me`),
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
  GENETIC: () => msg(html`Data related to my genetic characteristics`),
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
  GRANTED: () => msg('Granted'),
  DENIED: () => msg('Denied'),
  'PARTIALLY-GRANTED': () => msg('Partially Granted'),
  'UNDER-REVIEW': () => msg('Under Review'),
  CANCELED: () => msg('Canceled'),
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

export const PROCESSING_CATEGORIES = {
  '*': () => msg('All'),
  ANONYMIZATION: () => msg('Anonymization'),
  'AUTOMATED-INFERENCE': () => msg('Automated Inference'),
  'AUTOMATED-DECISION-MAKING': () => msg('Automated Decision Making'),
  COLLECTION: () => msg('Collection'),
  GENERATING: () => msg('Generating'),
  PUBLISHING: () => msg('Publishing'),
  STORING: () => msg('Storing'),
  SHARING: () => msg('Sharing'),
  USING: () => msg('Using'),
  'OTHER-PROCESSING': () => msg('Other Processing'),
};

export const PROCESSING_CATEGORY_DESCRIPTIONS = {
  '*': () => msg(html`<b>All</b> processing categories`),
  ANONYMIZATION: () =>
    msg(
      'Processing of personal data in such a manner that the personal data can no longer be attributed to a specific data subject without the use of additional information'
    ),
  'AUTOMATED-INFERENCE': () =>
    msg(
      'Automatically infering data about the person, including for profiling and clustering'
    ),
  'AUTOMATED-DECISION-MAKING': () => msg('Automated decision-making'),
  COLLECTION: () =>
    msg(
      'Collecting data about the person from the person or from another source, including another person or a System'
    ),
  GENERATING: () =>
    msg(
      'Producing novel data related to the person, such as making photo, voice or video recordings, or reconding user actions such as making a log.'
    ),
  MATCHING: () =>
    msg('Matching the data about the same person across multiple data sources'),
  PUBLISHING: () => msg('Making data publicly available'),
  STORING: () =>
    msg(
      'Storing data for further use, including adaptations and formating of the data'
    ),
  SHARING: () =>
    msg('Sharing data in controled manner with clearly identified parties'),
  USING: () => msg('Consulting and using data'),
  'OTHER-PROCESSING': () => msg('Other processing categories)'),
};

export const PURPOSES = {
  '*': () => msg('All'),
  ADVERTISING: () => msg('Advertising'),
  COMPLIANCE: () => msg('Compliance'),
  EMPLOYMENT: () => msg('Employment'),
  JUSTICE: () => msg('Justice'),
  MARKETING: () => msg('Marketing'),
  MEDICAL: () => msg('Medical'),
  PERSONALIZATION: () => msg('Personalization'),
  'PUBLIC-INTERESTS': () => msg('Public Interests'),
  RESEARCH: () => msg('Research'),
  SALE: () => msg('Sale'),
  SECURITY: () => msg('Security'),
  SERVICES: () => msg('Services'),
  'SERVICES.ADDITIONAL-SERVICES': () => msg('Services - Additional Services'),
  'SERVICES.BASIC-SERVICE': () => msg('Services - Basic Services'),
  'SOCIAL-PROTECTION': () => msg('Social Protection'),
  TRACKING: () => msg('Tracking'),
  'VITAL-INTERESTS': () => msg('Vitial Interests'),
  'OTHER-PURPOSE': () => msg('Other Purpose'),
};

export const PURPOSE_DESCRIPTIONS = {
  '*': () => msg(html`<b>All</b> purposes`),
  ADVERTISING: () =>
    msg(
      'To show ads that are either targeted to the specific user or not targeted'
    ),
  COMPLIANCE: () =>
    msg('Processing is performed to comply with a legal obligation'),
  EMPLOYMENT: () =>
    msg(' For personnel training, recruitment, payroll, management, etc'),
  JUSTICE: () =>
    msg(
      'Processing is necessary for the establishment, exercise or defence of legal claims or whenever courts are acting in their judicial capacity'
    ),
  MARKETING: () =>
    msg('To contact the user to offer products, services, or other promotions'),
  MEDICAL: () =>
    msg(
      'Processing is necessary for the purposes of preventive or occupational medicine, for the assessment of the working capacity of the employee, medical diagnosis, the provision of health or social care or treatment or the management of health or social care systems and services'
    ),
  PERSONALIZATION: () =>
    msg('For providing user with a personalized experience'),
  'PUBLIC-INTERESTS': () =>
    msg(
      'Processing is necessary for the performance of a task carried out in the public interest or in the exercise of official authority'
    ),
  RESEARCH: () => msg('Scientific and Market Research'),
  SALE: () => msg('Selling data to third parties'),
  SECURITY: () =>
    msg(
      'For product operation and security, enforcement of terms of service, fraud prevention, protecting users and property, etc. '
    ),
  SERVICES: () =>
    msg(
      'Processing is necessary performed in the context of services provided to the Data Subject or contracts and transactions being concluded with them'
    ),
  'SERVICES.ADDITIONAL-SERVICES': () =>
    msg(
      'Providing the services that the person requires that are not part of the basic service'
    ),
  'SERVICES.BASIC-SERVICE': () =>
    msg('Providing the basic service to the person'),
  'SOCIAL-PROTECTION': () =>
    msg(
      'Processing is necessary for the purposes of employment and social security and social protection'
    ),
  TRACKING: () =>
    msg('Tracking information about user behavior and activity online'),
  'VITAL-INTERESTS': () =>
    msg(
      'Processing is necessary in order to protect the vital interests of the data subject or of another natural person'
    ),
  'OTHER-PURPOSE': () => msg('Other specific purpose'),
};
