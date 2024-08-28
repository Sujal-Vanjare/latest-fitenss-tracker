type MonthlyData = {
  month: string;
  weight: number;
};

type BodyWeightEntry = {
  id: number;
  body_weight: number;
  recorded_at: Date;
};

type Exercise = {
  id: number;
  name: string;
  created_at: Date;
  category_name: string;
  order: number;
};

type WorkoutEntry = {
  id: number;
  weight: number;
  recorded_at: Date;
  sets: number;
  total_reps: number;
};
