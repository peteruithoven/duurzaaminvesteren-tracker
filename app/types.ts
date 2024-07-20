export type Data = {
  funded: number;
  minAmount: number;
  minProgress: string;
  minStrokeDasharray: string;
  targetAmount: number;
  targetProgress: string;
  targetStrokeDasharray: string;
};

export type DBData = Data & {
  time: string;
};
