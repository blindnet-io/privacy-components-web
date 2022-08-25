interface History {
  id: string;
  date: Date;
  demands: number;
  status: string;
}

export type HistoryResponse = { history: History[] };
