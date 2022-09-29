import { OpenAPI } from '../core/OpenAPI.js';
import { request } from '../core/request.js';

class ConfigurationService {
    /**
     * Get general information about the app
     * @returns GeneralInformation
     * @throws ApiError
     */
    static getV0ConfigureGeneralInfo() {
        return request(OpenAPI, {
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
    static putV0ConfigureGeneralInfo(requestBody) {
        return request(OpenAPI, {
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
    static getV0ConfigurePrivacyScopeDimensions() {
        return request(OpenAPI, {
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
    static putV0ConfigureSelectors(requestBody) {
        return request(OpenAPI, {
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
    static getV0ConfigureLegalBases() {
        return request(OpenAPI, {
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
    static putV0ConfigureLegalBases(requestBody) {
        return request(OpenAPI, {
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
    static getV0ConfigureLegalBasesLegalbaseid(legalBaseId) {
        return request(OpenAPI, {
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
    static putV0ConfigureRetentionPolicies(requestBody) {
        return request(OpenAPI, {
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
    static deleteV0ConfigureRetentionPoliciesRetentionpolicyid(retentionPolicyId) {
        return request(OpenAPI, {
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
    static putV0ConfigureProvenances(requestBody) {
        return request(OpenAPI, {
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
    static deleteV0ConfigureProvenancesProvenanceid(provenanceId) {
        return request(OpenAPI, {
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
    static getV0ConfigureDataCategories() {
        return request(OpenAPI, {
            method: 'GET',
            url: '/v0/configure/data-categories',
        });
    }
    /**
     * Get all regulations
     * @returns RegulationResponsePayload
     * @throws ApiError
     */
    static getV0ConfigureRegulations() {
        return request(OpenAPI, {
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
    static putV0ConfigureRegulations(requestBody) {
        return request(OpenAPI, {
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
    static getV0ConfigureRegulationsApp() {
        return request(OpenAPI, {
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
    static deleteV0ConfigureRegulationsRegulationid(regulationId) {
        return request(OpenAPI, {
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
    static getV0ConfigureDemandResolutionStrategy() {
        return request(OpenAPI, {
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
    static putV0ConfigureDemandResolutionStrategy(requestBody) {
        return request(OpenAPI, {
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

export { ConfigurationService };
//# sourceMappingURL=ConfigurationService.js.map
