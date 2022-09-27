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
import type { DemandResolution } from './DemandResolution';
import {
  DemandResolutionFromJSON,
  DemandResolutionFromJSONTyped,
  DemandResolutionToJSON,
} from './DemandResolution';

/**
 *
 * @export
 * @interface DemandResolutionStrategy
 */
export interface DemandResolutionStrategy {
  /**
   *
   * @type {DemandResolution}
   * @memberof DemandResolutionStrategy
   */
  transparency: DemandResolution;
  /**
   *
   * @type {DemandResolution}
   * @memberof DemandResolutionStrategy
   */
  access: DemandResolution;
  /**
   *
   * @type {DemandResolution}
   * @memberof DemandResolutionStrategy
   */
  _delete: DemandResolution;
  /**
   *
   * @type {DemandResolution}
   * @memberof DemandResolutionStrategy
   */
  consents: DemandResolution;
}

/**
 * Check if a given object implements the DemandResolutionStrategy interface.
 */
export function instanceOfDemandResolutionStrategy(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'transparency' in value;
  isInstance = isInstance && 'access' in value;
  isInstance = isInstance && '_delete' in value;
  isInstance = isInstance && 'consents' in value;

  return isInstance;
}

export function DemandResolutionStrategyFromJSON(
  json: any
): DemandResolutionStrategy {
  return DemandResolutionStrategyFromJSONTyped(json, false);
}

export function DemandResolutionStrategyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): DemandResolutionStrategy {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    transparency: DemandResolutionFromJSON(json['transparency']),
    access: DemandResolutionFromJSON(json['access']),
    _delete: DemandResolutionFromJSON(json['delete']),
    consents: DemandResolutionFromJSON(json['consents']),
  };
}

export function DemandResolutionStrategyToJSON(
  value?: DemandResolutionStrategy | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    transparency: DemandResolutionToJSON(value.transparency),
    access: DemandResolutionToJSON(value.access),
    delete: DemandResolutionToJSON(value._delete),
    consents: DemandResolutionToJSON(value.consents),
  };
}
