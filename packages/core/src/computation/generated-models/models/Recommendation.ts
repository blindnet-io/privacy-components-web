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
/**
 *
 * @export
 * @interface Recommendation
 */
export interface Recommendation {
  /**
   *
   * @type {string}
   * @memberof Recommendation
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Recommendation
   */
  d_id: string;
  /**
   *
   * @type {string}
   * @memberof Recommendation
   */
  status?: RecommendationStatusEnum;
  /**
   *
   * @type {string}
   * @memberof Recommendation
   */
  motive?: RecommendationMotiveEnum;
  /**
   *
   * @type {Array<string>}
   * @memberof Recommendation
   */
  data_categories?: Array<string>;
  /**
   *
   * @type {Date}
   * @memberof Recommendation
   */
  date_from?: Date;
  /**
   *
   * @type {Date}
   * @memberof Recommendation
   */
  date_to?: Date;
  /**
   *
   * @type {string}
   * @memberof Recommendation
   */
  provenance?: RecommendationProvenanceEnum;
  /**
   *
   * @type {string}
   * @memberof Recommendation
   */
  target?: RecommendationTargetEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum RecommendationStatusEnum {
  Granted = 'GRANTED',
  Denied = 'DENIED',
  PartiallyGranted = 'PARTIALLY-GRANTED',
  UnderReview = 'UNDER-REVIEW',
  Canceled = 'CANCELED',
}
/**
 * @export
 * @enum {string}
 */
export enum RecommendationMotiveEnum {
  IdentityUnconfirmed = 'IDENTITY-UNCONFIRMED',
  LanguageUnsupported = 'LANGUAGE-UNSUPPORTED',
  ValidReasons = 'VALID-REASONS',
  Impossible = 'IMPOSSIBLE',
  NoSuchData = 'NO-SUCH-DATA',
  RequestUnsupported = 'REQUEST-UNSUPPORTED',
  UserUnknown = 'USER-UNKNOWN',
  OtherMotive = 'OTHER-MOTIVE',
}
/**
 * @export
 * @enum {string}
 */
export enum RecommendationProvenanceEnum {
  Star = '*',
  Derived = 'DERIVED',
  Transferred = 'TRANSFERRED',
  User = 'USER',
  UserDataSubject = 'USER.DATA-SUBJECT',
}
/**
 * @export
 * @enum {string}
 */
export enum RecommendationTargetEnum {
  Star = '*',
  Organization = 'ORGANIZATION',
  System = 'SYSTEM',
  Partners = 'PARTNERS',
  PartnersDownward = 'PARTNERS.DOWNWARD',
  PartnersUpward = 'PARTNERS.UPWARD',
}

/**
 * Check if a given object implements the Recommendation interface.
 */
export function instanceOfRecommendation(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'd_id' in value;

  return isInstance;
}

export function RecommendationFromJSON(json: any): Recommendation {
  return RecommendationFromJSONTyped(json, false);
}

export function RecommendationFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Recommendation {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    d_id: json['d_id'],
    status: !exists(json, 'status') ? undefined : json['status'],
    motive: !exists(json, 'motive') ? undefined : json['motive'],
    data_categories: !exists(json, 'data_categories')
      ? undefined
      : json['data_categories'],
    date_from: !exists(json, 'date_from')
      ? undefined
      : new Date(json['date_from']),
    date_to: !exists(json, 'date_to') ? undefined : new Date(json['date_to']),
    provenance: !exists(json, 'provenance') ? undefined : json['provenance'],
    target: !exists(json, 'target') ? undefined : json['target'],
  };
}

export function RecommendationToJSON(value?: Recommendation | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    d_id: value.d_id,
    status: value.status,
    motive: value.motive,
    data_categories: value.data_categories,
    date_from:
      value.date_from === undefined ? undefined : value.date_from.toISOString(),
    date_to:
      value.date_to === undefined ? undefined : value.date_to.toISOString(),
    provenance: value.provenance,
    target: value.target,
  };
}
