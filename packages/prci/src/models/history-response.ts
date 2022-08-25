export interface RequestHistoryItem {
  id: string;
  date: string;
  demands: number;
  status: string;
}

export type HistoryResponse = { history: RequestHistoryItem[] };
