// import { ACTION } from "./priv.js";

// export interface DICTIONARY {
//   ACTION.ACCESS: "test"
// }

export const action = {
  ACCESS: {
    NAME: 'ACCESS',
    DESCRIPTION: 'Access my data',
  },
  DELETE: {
    NAME: 'DELETE',
    DESCRIPTION: 'Have my data deleted',
  },
  MODIFY: {
    NAME: 'MODIFY',
    DESCRIPTION: 'Modify or complement my data',
  },
  OBJECT: {
    NAME: 'OBJECT',
    DESCRIPTION: 'Object to processing of my data',
  },
  PORTABILITY: {
    NAME: 'PORTABILITY',
    DESCRIPTION: 'Take my data and have it transfered somewhere else',
  },
  RESTRICT: {
    NAME: 'RESTRICT',
    DESCRIPTION: 'Restrict processing of my data to a particular scope',
  },
  'REVOKE-CONSENT': {
    NAME: 'REVOKE-CONSENT',
    DESCRIPTION: 'Revoke previously given consent for data processing',
  },
  TRANSPARENCY: {
    NAME: 'TRANSPARENCY',
    DESCRIPTION: 'Demand information related to data processing practices',
  },
  'OTHER-DEMAND': {
    NAME: 'OTHER-DEMAND',
    DESCRIPTION: 'Do or know something else',
  },
  // "": {
  //   "NAME": "",
  //   "DESCRIPTION": ""
  // },
};

export const TRANSPARENCY = {
  DATA_CATEGORIES: {
    NAME: 'DATA-CATEGORIES',
    DESCRIPTION:
      'I want to know the categories of the data the organization has on me',
  },
  DPO: {
    NAME: 'DPO',
    DESCRIPTION:
      'I want to know the contact details of the data protection officer',
  },
  KNOWN: {
    NAME: 'KNOWN',
    DESCRIPTION: 'I want to know if the organization has data on me',
  },
  LEGAL_BASES: {
    NAME: 'LEGAL-BASES',
    DESCRIPTION:
      'I want to know the legal bases for processing my data (including legitimate interests)',
  },
  ORGANIZATION: {
    NAME: 'ORGANIZATION',
    DESCRIPTION:
      'I want to know the identity and contact details of the organization processing my data',
  },
  POLICY: {
    NAME: 'POLICY',
    DESCRIPTION:
      'I want to know the policies applied to processing of data concerning me',
  },
  PROCESSING_CATEGORIES: {
    NAME: 'PROCESSING_CATEGORIES',
    DESCRIPTION:
      'I want to know the cateogories of processing being done on the data the organization has on me',
  },
  PROVENANCE: {
    NAME: 'PROVENANCE',
    DESCRIPTION:
      'I want to know the sources that the data concerning me come from',
  },
  PURPOSE: {
    NAME: 'PURPOSE',
    DESCRIPTION:
      'I want to know the purpose of the processing o the data the organization has on me',
  },
  RETENTION: {
    NAME: 'RETENTION',
    DESCRIPTION: 'I want to know for how long the data concerning me kept',
  },
  WHERE: {
    NAME: 'WHERE',
    DESCRIPTION: 'I want to know where the data about me is stored',
  },
  WHO: {
    NAME: 'WHO',
    DESCRIPTION:
      'I want to know who can access the data that the organization has on me',
  },
};
