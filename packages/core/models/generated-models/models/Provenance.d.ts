export type Provenance = {
    id: string;
    provenance: Provenance.provenance;
    system?: string;
};
export declare namespace Provenance {
    enum provenance {
        _ = "*",
        DERIVED = "DERIVED",
        TRANSFERRED = "TRANSFERRED",
        USER = "USER",
        USER_DATA_SUBJECT = "USER.DATA-SUBJECT"
    }
}
