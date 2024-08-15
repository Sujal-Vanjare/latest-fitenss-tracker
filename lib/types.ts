type ChartEntry = {
  recorded_at: string;
  body_weight: number;
  bodyweight_change: number;
};

type MonthlyData = {
  month: string;
  weight: number;
};

type BodyWeightEntry = {
  id: number; // or string, depending on your database setup
  body_weight: number;
  recorded_at: string;
};
