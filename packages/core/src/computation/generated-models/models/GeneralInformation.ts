/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GeneralInformation = {
  /**
   * countries where data servers are located (including those of the processors who are processing data on your behalf
   */
  countries?: Array<string>;
  /**
   * name and contact details of your Organization and its representative
   */
  organization: string;
  /**
   * identity and contact of a Data Protection Officer - if you are using blindnet devkit Privacy Request Builder, include the URL where you are hosting the interface
   */
  dpo: string;
  /**
   * list of unique descriptive identifiers of Data Consumer Categories
   */
  data_consumer_categories?: Array<string>;
  /**
   * public URL where your Privacy Policy can be consulted
   */
  privacy_policy_link?: string;
  /**
   * general description of the technical and organizational security measures referred to in Article 32 of GDPR
   */
  data_security_info?: string;
};
