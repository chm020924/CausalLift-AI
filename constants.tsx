
import { UserSegment, UpliftResult, CampaignHistory } from './types';

export const MOCK_UPLIFT_DATA: UpliftResult[] = [
  {
    segment: UserSegment.PERSUADABLE,
    count: 2450,
    conversionRateTreatment: 0.18,
    conversionRateControl: 0.05,
    uplift: 0.13,
    color: '#3b82f6'
  },
  {
    segment: UserSegment.SURE_THING,
    count: 1200,
    conversionRateTreatment: 0.92,
    conversionRateControl: 0.91,
    uplift: 0.01,
    color: '#10b981'
  },
  {
    segment: UserSegment.LOST_CAUSE,
    count: 5800,
    conversionRateTreatment: 0.02,
    conversionRateControl: 0.02,
    uplift: 0,
    color: '#94a3b8'
  },
  {
    segment: UserSegment.SLEEPING_DOG,
    count: 150,
    conversionRateTreatment: 0.01,
    conversionRateControl: 0.04,
    uplift: -0.03,
    color: '#ef4444'
  }
];

export const CAMPAIGN_HISTORY: CampaignHistory[] = [
  { id: '1', name: 'Summer Festival Coupons', date: '2024-06-12', method: 'X-Learner', roi: 4.2, incrementalRevenue: 124000 },
  { id: '2', name: 'New User Retention Push', date: '2024-07-05', method: 'DR-Learner', roi: 2.8, incrementalRevenue: 89000 },
  { id: '3', name: 'Dormant User Re-activation', date: '2024-08-20', method: 'T-Learner', roi: 1.5, incrementalRevenue: 45000 },
];
