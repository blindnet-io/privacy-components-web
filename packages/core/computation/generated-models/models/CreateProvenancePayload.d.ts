/**
 * origin of the data category
 */
export type CreateProvenancePayload = {
    /**
     * data category for which the provenance is created
     */
    data_category: string;
    /**
     * provenance type
     */
    provenance: CreateProvenancePayload.provenance;
    /**
     * id of the system data category originated from. null for own system
     */
    system?: string;
};
export declare namespace CreateProvenancePayload {
    /**
     * provenance type
     */
    enum provenance {
        _ = "*",
        DERIVED = "DERIVED",
        TRANSFERRED = "TRANSFERRED",
        USER = "USER",
        USER_DATA_SUBJECT = "USER.DATA-SUBJECT"
    }
}
