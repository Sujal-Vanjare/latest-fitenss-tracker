type MonthlyData = {
  month: string;
  weight: number;
};

type BodyWeightEntry = {
  id: number;
  body_weight: number;
  recorded_at: string;
};

type Exercise = {
  id: string;
  category_name: string;
  name: string;
  created_at: string;
  order: number;
};
