import { REQUEST_STATUS } from './priv-terms.js';
export interface RequestHistoryItem {
    id: string;
    date: string;
    demands: number;
    status: REQUEST_STATUS;
}
export type HistoryResponse = {
    history: RequestHistoryItem[];
};
