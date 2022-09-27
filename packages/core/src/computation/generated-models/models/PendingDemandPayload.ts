/* tslint:disable */
/* eslint-disable */
/**
 * Privacy computation engine
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.5.0-SNAPSHOT
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { DataSubjectPayload } from './DataSubjectPayload';
import {
  DataSubjectPayloadFromJSON,
  DataSubjectPayloadFromJSONTyped,
  DataSubjectPayloadToJSON,
} from './DataSubjectPayload';

/**
 *
 * @export
 * @interface PendingDemandPayload
 */
export interface PendingDemandPayload {
  /**
   *
   * @type {string}
   * @memberof PendingDemandPayload
   */
  id: string;
  /**
   *
   * @type {Date}
   * @memberof PendingDemandPayload
   */
  date: Date;
  /**
   *
   * @type {string}
   * @memberof PendingDemandPayload
   */
  action: PendingDemandPayloadActionEnum;
  /**
   *
   * @type {DataSubjectPayload}
   * @memberof PendingDemandPayload
   */
  data_subject?: DataSubjectPayload;
}

/**
 * @export
 * @enum {string}
 */
export enum PendingDemandPayloadActionEnum {
  Access = 'ACCESS',
  Delete = 'DELETE',
  Modify = 'MODIFY',
  Object = 'OBJECT',
  Portability = 'PORTABILITY',
  Restrict = 'RESTRICT',
  RevokeConsent = 'REVOKE-CONSENT',
  Transparency = 'TRANSPARENCY',
  TransparencyDataCategories = 'TRANSPARENCY.DATA-CATEGORIES',
  TransparencyDpo = 'TRANSPARENCY.DPO',
  TransparencyKnown = 'TRANSPARENCY.KNOWN',
  TransparencyLegalBases = 'TRANSPARENCY.LEGAL-BASES',
  TransparencyOrganization = 'TRANSPARENCY.ORGANIZATION',
  TransparencyPolicy = 'TRANSPARENCY.POLICY',
  TransparencyProcessingCategories = 'TRANSPARENCY.PROCESSING-CATEGORIES',
  TransparencyProvenance = 'TRANSPARENCY.PROVENANCE',
  TransparencyPurpose = 'TRANSPARENCY.PURPOSE',
  TransparencyRetention = 'TRANSPARENCY.RETENTION',
  TransparencyWhere = 'TRANSPARENCY.WHERE',
  TransparencyWho = 'TRANSPARENCY.WHO',
  Other = 'OTHER',
}

/**
 * Check if a given object implements the PendingDemandPayload interface.
 */
export function instanceOfPendingDemandPayload(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'date' in value;
  isInstance = isInstance && 'action' in value;

  return isInstance;
}

export function PendingDemandPayloadFromJSON(json: any): PendingDemandPayload {
  return PendingDemandPayloadFromJSONTyped(json, false);
}

export function PendingDemandPayloadFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PendingDemandPayload {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    date: new Date(json['date']),
    action: json['action'],
    data_subject: !exists(json, 'data_subject')
      ? undefined
      : DataSubjectPayloadFromJSON(json['data_subject']),
  };
}

export function PendingDemandPayloadToJSON(
  value?: PendingDemandPayload | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    date: value.date.toISOString(),
    action: value.action,
    data_subject: DataSubjectPayloadToJSON(value.data_subject),
  };
}
