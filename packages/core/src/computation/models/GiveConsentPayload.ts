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
 * @interface GiveConsentPayload
 */
export interface GiveConsentPayload {
  /**
   *
   * @type {DataSubjectPayload}
   * @memberof GiveConsentPayload
   */
  dataSubject: DataSubjectPayload;
  /**
   *
   * @type {string}
   * @memberof GiveConsentPayload
   */
  consentId: string;
  /**
   *
   * @type {Date}
   * @memberof GiveConsentPayload
   */
  date: Date;
}

/**
 * Check if a given object implements the GiveConsentPayload interface.
 */
export function instanceOfGiveConsentPayload(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'dataSubject' in value;
  isInstance = isInstance && 'consentId' in value;
  isInstance = isInstance && 'date' in value;

  return isInstance;
}

export function GiveConsentPayloadFromJSON(json: any): GiveConsentPayload {
  return GiveConsentPayloadFromJSONTyped(json, false);
}

export function GiveConsentPayloadFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GiveConsentPayload {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    dataSubject: DataSubjectPayloadFromJSON(json['dataSubject']),
    consentId: json['consentId'],
    date: new Date(json['date']),
  };
}

export function GiveConsentPayloadToJSON(
  value?: GiveConsentPayload | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    dataSubject: DataSubjectPayloadToJSON(value.dataSubject),
    consentId: value.consentId,
    date: value.date.toISOString(),
  };
}
