/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddRegulationsPayload } from '../models/AddRegulationsPayload.js';
import type { CreateLegalBasePayload } from '../models/CreateLegalBasePayload.js';
import type { CreateProvenancePayload } from '../models/CreateProvenancePayload.js';
import type { CreateRetentionPolicyPayload } from '../models/CreateRetentionPolicyPayload.js';
import type { CreateSelectorPayload } from '../models/CreateSelectorPayload.js';
import type { DataCategoryResponsePayload } from '../models/DataCategoryResponsePayload.js';
import type { DemandResolutionStrategy } from '../models/DemandResolutionStrategy.js';
import type { GeneralInformation } from '../models/GeneralInformation.js';
import type { LegalBase } from '../models/LegalBase.js';
import type { PrivacyScopeDimensionsPayload } from '../models/PrivacyScopeDimensionsPayload.js';
import type { RegulationResponsePayload } from '../models/RegulationResponsePayload.js';

import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';

export class ConfigurationService {
  /**
   * Get general information about the app
   * @returns GeneralInformation
   * @throws ApiError
   */
  public static getV0ConfigureGeneralInfo(): CancelablePromise<GeneralInformation> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/configure/general-info',
    });
  }

  /**
   * Update general information about the app
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static putV0ConfigureGeneralInfo(
    requestBody: GeneralInformation
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/v0/configure/general-info',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * Get data categories, processing categories and purposes
   * @returns PrivacyScopeDimensionsPayload
   * @throws ApiError
   */
  public static getV0ConfigurePrivacyScopeDimensions(): CancelablePromise<PrivacyScopeDimensionsPayload> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/configure/privacy-scope-dimensions',
    });
  }

  /**
   * Add selectors
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static putV0ConfigureSelectors(
    requestBody?: Array<CreateSelectorPayload>
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/v0/configure/selectors',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * Get the list of legal bases
   * @returns LegalBase
   * @throws ApiError
   */
  public static getV0ConfigureLegalBases(): CancelablePromise<
    Array<LegalBase>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/configure/legal-bases',
    });
  }

  /**
   * Create new legal bases
   * @param requestBody
   * @returns string
   * @throws ApiError
   */
  public static putV0ConfigureLegalBases(
    requestBody: CreateLegalBasePayload
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/v0/configure/legal-bases',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * Get a legal bases
   * @param legalBaseId
   * @returns LegalBase
   * @throws ApiError
   */
  public static getV0ConfigureLegalBasesLegalbaseid(
    legalBaseId: string
  ): CancelablePromise<LegalBase> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/configure/legal-bases/{legalBaseId}',
      path: {
        legalBaseId: legalBaseId,
      },
      errors: {
        400: `Invalid value for: path parameter legalBaseId`,
      },
    });
  }

  /**
   * Create retention policies for data categories
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static putV0ConfigureRetentionPolicies(
    requestBody?: Array<CreateRetentionPolicyPayload>
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/v0/configure/retention-policies',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * Delete retention policy
   * @param retentionPolicyId
   * @returns any
   * @throws ApiError
   */
  public static deleteV0ConfigureRetentionPoliciesRetentionpolicyid(
    retentionPolicyId: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v0/configure/retention-policies/{retentionPolicyId}',
      path: {
        retentionPolicyId: retentionPolicyId,
      },
      errors: {
        400: `Invalid value for: path parameter retentionPolicyId`,
      },
    });
  }

  /**
   * Create provenances for data categories
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static putV0ConfigureProvenances(
    requestBody?: Array<CreateProvenancePayload>
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/v0/configure/provenances',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * Delete provenance
   * @param provenanceId
   * @returns any
   * @throws ApiError
   */
  public static deleteV0ConfigureProvenancesProvenanceid(
    provenanceId: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v0/configure/provenances/{provenanceId}',
      path: {
        provenanceId: provenanceId,
      },
      errors: {
        400: `Invalid value for: path parameter provenanceId`,
      },
    });
  }

  /**
   * Get data categories with retention policies and provenances
   * @returns DataCategoryResponsePayload
   * @throws ApiError
   */
  public static getV0ConfigureDataCategories(): CancelablePromise<
    Array<DataCategoryResponsePayload>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/configure/data-categories',
    });
  }

  /**
   * Get all regulations
   * @returns RegulationResponsePayload
   * @throws ApiError
   */
  public static getV0ConfigureRegulations(): CancelablePromise<
    Array<RegulationResponsePayload>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/configure/regulations',
    });
  }

  /**
   * Assign regulation to an app
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static putV0ConfigureRegulations(
    requestBody: AddRegulationsPayload
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/v0/configure/regulations',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * Get regulations applied to the users of the app
   * @returns RegulationResponsePayload
   * @throws ApiError
   */
  public static getV0ConfigureRegulationsApp(): CancelablePromise<
    Array<RegulationResponsePayload>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/configure/regulations/app',
    });
  }

  /**
   * Delete regulation assigned to an app
   * @param regulationId
   * @returns any
   * @throws ApiError
   */
  public static deleteV0ConfigureRegulationsRegulationid(
    regulationId: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v0/configure/regulations/{regulationId}',
      path: {
        regulationId: regulationId,
      },
      errors: {
        400: `Invalid value for: path parameter regulationId`,
      },
    });
  }

  /**
   * Get information about demand resolution strategies
   * @returns DemandResolutionStrategy
   * @throws ApiError
   */
  public static getV0ConfigureDemandResolutionStrategy(): CancelablePromise<DemandResolutionStrategy> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/configure/demand-resolution-strategy',
    });
  }

  /**
   * Update demand resolution strategies
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static putV0ConfigureDemandResolutionStrategy(
    requestBody: DemandResolutionStrategy
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/v0/configure/demand-resolution-strategy',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }
}
