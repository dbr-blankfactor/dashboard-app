export interface BalanceChartProps {
  data: BalanceDataPoint[];
  dataKey: keyof BalanceDataPoint;
}

export interface BalanceDataPoint {
  month: string;
  available: number;
  pending: number;
  total: number;
  highlight?: boolean;
  value?: string;
}

export interface NetFlowDataPoint {
  month: string;
  value: number;
  highlight?: boolean;
  amount?: string;
}
