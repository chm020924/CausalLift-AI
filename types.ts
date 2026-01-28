
export enum UserSegment {
  PERSUADABLE = 'Persuadable', // 说服型
  SURE_THING = 'Sure Thing',   // 自然转化型
  LOST_CAUSE = 'Lost Cause',   // 无论如何不买
  SLEEPING_DOG = 'Sleeping Dog' // 勿扰型 (发券反而不买)
}

export interface MetricData {
  label: string;
  value: number;
  change: number;
  unit?: string;
}

export interface UpliftResult {
  segment: UserSegment;
  count: number;
  conversionRateTreatment: number;
  conversionRateControl: number;
  uplift: number;
  color: string;
}

export interface PSMPoint {
  score: number;
  density: number;
  group: 'Treatment' | 'Control';
}

export interface CampaignHistory {
  id: string;
  name: string;
  date: string;
  method: 'X-Learner' | 'S-Learner' | 'T-Learner' | 'DR-Learner';
  roi: number;
  incrementalRevenue: number;
}
