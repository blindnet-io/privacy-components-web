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
export declare class ConfigurationService {
    /**
     * Get general information about the app
     * @returns GeneralInformation
     * @throws ApiError
     */
    static getV0ConfigureGeneralInfo(): CancelablePromise<GeneralInformation>;
    /**
     * Update general information about the app
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putV0ConfigureGeneralInfo(requestBody: GeneralInformation): CancelablePromise<any>;
    /**
     * Get data categories, processing categories and purposes
     * @returns PrivacyScopeDimensionsPayload
     * @throws ApiError
     */
    static getV0ConfigurePrivacyScopeDimensions(): CancelablePromise<PrivacyScopeDimensionsPayload>;
    /**
     * Add selectors
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putV0ConfigureSelectors(requestBody?: Array<CreateSelectorPayload>): CancelablePromise<any>;
    /**
     * Get the list of legal bases
     * @returns LegalBase
     * @throws ApiError
     */
    static getV0ConfigureLegalBases(): CancelablePromise<Array<LegalBase>>;
    /**
     * Create new legal bases
     * @param requestBody
     * @returns string
     * @throws ApiError
     */
    static putV0ConfigureLegalBases(requestBody: CreateLegalBasePayload): CancelablePromise<string>;
    /**
     * Get a legal bases
     * @param legalBaseId
     * @returns LegalBase
     * @throws ApiError
     */
    static getV0ConfigureLegalBasesLegalbaseid(legalBaseId: string): CancelablePromise<LegalBase>;
    /**
     * Create retention policies for data categories
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putV0ConfigureRetentionPolicies(requestBody?: Array<CreateRetentionPolicyPayload>): CancelablePromise<any>;
    /**
     * Delete retention policy
     * @param retentionPolicyId
     * @returns any
     * @throws ApiError
     */
    static deleteV0ConfigureRetentionPoliciesRetentionpolicyid(retentionPolicyId: string): CancelablePromise<any>;
    /**
     * Create provenances for data categories
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putV0ConfigureProvenances(requestBody?: Array<CreateProvenancePayload>): CancelablePromise<any>;
    /**
     * Delete provenance
     * @param provenanceId
     * @returns any
     * @throws ApiError
     */
    static deleteV0ConfigureProvenancesProvenanceid(provenanceId: string): CancelablePromise<any>;
    /**
     * Get data categories with retention policies and provenances
     * @returns DataCategoryResponsePayload
     * @throws ApiError
     */
    static getV0ConfigureDataCategories(): CancelablePromise<Array<DataCategoryResponsePayload>>;
    /**
     * Get all regulations
     * @returns RegulationResponsePayload
     * @throws ApiError
     */
    static getV0ConfigureRegulations(): CancelablePromise<Array<RegulationResponsePayload>>;
    /**
     * Assign regulation to an app
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putV0ConfigureRegulations(requestBody: AddRegulationsPayload): CancelablePromise<any>;
    /**
     * Get regulations applied to the users of the app
     * @returns RegulationResponsePayload
     * @throws ApiError
     */
    static getV0ConfigureRegulationsApp(): CancelablePromise<Array<RegulationResponsePayload>>;
    /**
     * Delete regulation assigned to an app
     * @param regulationId
     * @returns any
     * @throws ApiError
     */
    static deleteV0ConfigureRegulationsRegulationid(regulationId: string): CancelablePromise<any>;
    /**
     * Get information about demand resolution strategies
     * @returns DemandResolutionStrategy
     * @throws ApiError
     */
    static getV0ConfigureDemandResolutionStrategy(): CancelablePromise<DemandResolutionStrategy>;
    /**
     * Update demand resolution strategies
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putV0ConfigureDemandResolutionStrategy(requestBody: DemandResolutionStrategy): CancelablePromise<any>;
}
