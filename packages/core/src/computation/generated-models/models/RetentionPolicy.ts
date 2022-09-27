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
 * @interface RetentionPolicy
 */
export interface RetentionPolicy {
  /**
   *
   * @type {string}
   * @memberof RetentionPolicy
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof RetentionPolicy
   */
  policy_type: RetentionPolicyPolicyTypeEnum;
  /**
   *
   * @type {string}
   * @memberof RetentionPolicy
   */
  duration: string;
  /**
   *
   * @type {string}
   * @memberof RetentionPolicy
   */
  after: RetentionPolicyAfterEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum RetentionPolicyPolicyTypeEnum {
  LongerThan = 'NO-LONGER-THAN',
  LessThan = 'NO-LESS-THAN',
}
/**
 * @export
 * @enum {string}
 */
export enum RetentionPolicyAfterEnum {
  CaptureDate = 'CAPTURE-DATE',
  RelationshipStart = 'RELATIONSHIP-START',
  RelationshipEnd = 'RELATIONSHIP-END',
  ServiceStart = 'SERVICE-START',
  ServiceEnd = 'SERVICE-END',
}

/**
 * Check if a given object implements the RetentionPolicy interface.
 */
export function instanceOfRetentionPolicy(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'policy_type' in value;
  isInstance = isInstance && 'duration' in value;
  isInstance = isInstance && 'after' in value;

  return isInstance;
}

export function RetentionPolicyFromJSON(json: any): RetentionPolicy {
  return RetentionPolicyFromJSONTyped(json, false);
}

export function RetentionPolicyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RetentionPolicy {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    policy_type: json['policy_type'],
    duration: json['duration'],
    after: json['after'],
  };
}

export function RetentionPolicyToJSON(value?: RetentionPolicy | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    policy_type: value.policy_type,
    duration: value.duration,
    after: value.after,
  };
}
