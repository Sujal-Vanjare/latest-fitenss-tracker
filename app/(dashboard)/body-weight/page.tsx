import AddBodyWeight from "@/components/bodyWeight/add-body-weight";
import BodyWeightBarChart from "@/components/bodyWeight/body-weight-bar-chart";
import BodyWeightChart from "@/components/bodyWeight/body-weight-chart";
import BodyWeightHistory from "@/components/bodyWeight/body-weight-history";

export default function Page() {
  const chartData = [
    { recorded_at: "2024-02-11", body_weight: 73.2, bodyweight_change: 0.0 },
    { recorded_at: "2024-04-11", body_weight: 73.2, bodyweight_change: 0.0 },
    { recorded_at: "2024-05-11", body_weight: 73.2, bodyweight_change: 0.0 },
    { recorded_at: "2024-05-12", body_weight: 73.4, bodyweight_change: 0.2 },
    { recorded_at: "2024-05-13", body_weight: 73.5, bodyweight_change: 0.1 },
    { recorded_at: "2024-05-14", body_weight: 73.7, bodyweight_change: 0.2 },
    { recorded_at: "2024-05-15", body_weight: 73.9, bodyweight_change: 0.2 },
    { recorded_at: "2024-05-16", body_weight: 74.1, bodyweight_change: 0.2 },
    { recorded_at: "2024-05-17", body_weight: 74.0, bodyweight_change: -0.1 },
    { recorded_at: "2024-05-18", body_weight: 74.3, bodyweight_change: 0.3 },
    { recorded_at: "2024-05-19", body_weight: 74.1, bodyweight_change: -0.2 },
    { recorded_at: "2024-05-20", body_weight: 74.5, bodyweight_change: 0.4 },
    { recorded_at: "2024-05-21", body_weight: 74.3, bodyweight_change: -0.2 },
    { recorded_at: "2024-05-22", body_weight: 74.6, bodyweight_change: 0.3 },
    { recorded_at: "2024-05-23", body_weight: 74.8, bodyweight_change: 0.2 },
    { recorded_at: "2024-05-24", body_weight: 74.7, bodyweight_change: -0.1 },
    { recorded_at: "2024-05-25", body_weight: 74.9, bodyweight_change: 0.2 },
    { recorded_at: "2024-05-26", body_weight: 75.1, bodyweight_change: 0.2 },
    { recorded_at: "2024-05-27", body_weight: 75.0, bodyweight_change: -0.1 },
    { recorded_at: "2024-05-28", body_weight: 75.2, bodyweight_change: 0.2 },
    { recorded_at: "2024-05-29", body_weight: 75.4, bodyweight_change: 0.2 },
    { recorded_at: "2024-05-30", body_weight: 75.1, bodyweight_change: -0.3 },
    { recorded_at: "2024-05-31", body_weight: 75.5, bodyweight_change: 0.4 },
    { recorded_at: "2024-06-01", body_weight: 78.0, bodyweight_change: 2.5 }, // Major weight gain
    { recorded_at: "2024-06-02", body_weight: 75.0, bodyweight_change: -3.0 }, // Major weight loss
    { recorded_at: "2024-06-03", body_weight: 75.4, bodyweight_change: 0.4 },
    { recorded_at: "2024-06-04", body_weight: 75.6, bodyweight_change: 0.2 },
    { recorded_at: "2024-06-05", body_weight: 75.5, bodyweight_change: -0.1 },
    { recorded_at: "2024-06-06", body_weight: 75.9, bodyweight_change: 0.4 },
    { recorded_at: "2024-06-07", body_weight: 75.8, bodyweight_change: -0.1 },
    { recorded_at: "2024-06-08", body_weight: 76.2, bodyweight_change: 0.4 },
    { recorded_at: "2024-06-09", body_weight: 76.0, bodyweight_change: -0.2 },
    { recorded_at: "2024-06-10", body_weight: 76.5, bodyweight_change: 0.5 },
    { recorded_at: "2024-06-11", body_weight: 76.7, bodyweight_change: 0.2 },
    { recorded_at: "2024-06-12", body_weight: 76.4, bodyweight_change: -0.3 },
    { recorded_at: "2024-06-13", body_weight: 76.9, bodyweight_change: 0.5 },
    { recorded_at: "2024-06-14", body_weight: 77.2, bodyweight_change: 0.3 },
    { recorded_at: "2024-06-15", body_weight: 77.0, bodyweight_change: -0.2 },
    { recorded_at: "2024-06-16", body_weight: 77.5, bodyweight_change: 0.5 },
    { recorded_at: "2024-06-17", body_weight: 77.4, bodyweight_change: -0.1 },
    { recorded_at: "2024-06-18", body_weight: 77.8, bodyweight_change: 0.4 },
    { recorded_at: "2024-06-19", body_weight: 77.6, bodyweight_change: -0.2 },
    { recorded_at: "2024-06-20", body_weight: 78.0, bodyweight_change: 0.4 },
    { recorded_at: "2024-06-21", body_weight: 77.8, bodyweight_change: -0.2 },
    { recorded_at: "2024-06-22", body_weight: 78.3, bodyweight_change: 0.5 },
    { recorded_at: "2024-06-23", body_weight: 78.0, bodyweight_change: -0.3 },
    { recorded_at: "2024-06-24", body_weight: 78.4, bodyweight_change: 0.4 },
    { recorded_at: "2024-06-25", body_weight: 78.7, bodyweight_change: 0.3 },
    { recorded_at: "2024-06-26", body_weight: 78.5, bodyweight_change: -0.2 },
    { recorded_at: "2024-06-27", body_weight: 79.0, bodyweight_change: 0.5 },
    { recorded_at: "2024-06-28", body_weight: 79.3, bodyweight_change: 0.3 },
    { recorded_at: "2024-06-29", body_weight: 79.0, bodyweight_change: -0.3 },
    { recorded_at: "2024-06-30", body_weight: 79.5, bodyweight_change: 0.5 },
    { recorded_at: "2024-07-01", body_weight: 79.2, bodyweight_change: -0.3 },
    { recorded_at: "2024-07-02", body_weight: 79.7, bodyweight_change: 0.5 },
    { recorded_at: "2024-07-03", body_weight: 79.9, bodyweight_change: 0.2 },
    { recorded_at: "2024-07-04", body_weight: 79.5, bodyweight_change: -0.4 },
    { recorded_at: "2024-07-05", body_weight: 79.8, bodyweight_change: 0.3 },
    { recorded_at: "2024-07-06", body_weight: 79.6, bodyweight_change: -0.2 },
    { recorded_at: "2024-07-07", body_weight: 80.0, bodyweight_change: 0.4 },
    { recorded_at: "2024-07-08", body_weight: 79.8, bodyweight_change: -0.2 },
    { recorded_at: "2024-07-09", body_weight: 80.2, bodyweight_change: 0.4 },
    { recorded_at: "2024-07-10", body_weight: 80.0, bodyweight_change: -0.2 },
    { recorded_at: "2024-07-11", body_weight: 80.4, bodyweight_change: 0.4 },
    { recorded_at: "2024-07-12", body_weight: 80.2, bodyweight_change: -0.2 },
    { recorded_at: "2024-07-13", body_weight: 80.7, bodyweight_change: 0.5 },
    { recorded_at: "2024-07-14", body_weight: 80.5, bodyweight_change: -0.2 },
    { recorded_at: "2024-07-15", body_weight: 81.0, bodyweight_change: 0.5 },
    { recorded_at: "2024-07-16", body_weight: 80.8, bodyweight_change: -0.2 },
    { recorded_at: "2024-07-17", body_weight: 81.3, bodyweight_change: 0.5 },
    { recorded_at: "2024-07-17", body_weight: 81.3, bodyweight_change: 0.5 },
    { recorded_at: "2024-07-18", body_weight: 81.0, bodyweight_change: -0.3 },
    { recorded_at: "2024-07-19", body_weight: 81.5, bodyweight_change: 0.5 },
    { recorded_at: "2024-07-20", body_weight: 81.3, bodyweight_change: -0.2 },
    { recorded_at: "2024-07-21", body_weight: 81.7, bodyweight_change: 0.4 },
    { recorded_at: "2024-07-22", body_weight: 81.5, bodyweight_change: -0.2 },
    { recorded_at: "2024-07-23", body_weight: 81.9, bodyweight_change: 0.4 },
    { recorded_at: "2024-07-24", body_weight: 81.7, bodyweight_change: -0.2 },
    { recorded_at: "2024-07-25", body_weight: 82.1, bodyweight_change: 0.4 },
    { recorded_at: "2024-07-26", body_weight: 81.8, bodyweight_change: -0.3 },
    { recorded_at: "2024-07-27", body_weight: 82.3, bodyweight_change: 0.5 },
    { recorded_at: "2024-07-28", body_weight: 82.0, bodyweight_change: -0.3 },
    { recorded_at: "2024-07-29", body_weight: 82.5, bodyweight_change: 0.5 },
    { recorded_at: "2024-07-30", body_weight: 82.2, bodyweight_change: -0.3 },
    { recorded_at: "2024-07-31", body_weight: 82.6, bodyweight_change: 0.4 },
    { recorded_at: "2024-08-01", body_weight: 82.4, bodyweight_change: -0.2 },
    { recorded_at: "2024-08-02", body_weight: 82.8, bodyweight_change: 0.4 },
    { recorded_at: "2024-08-03", body_weight: 82.6, bodyweight_change: -0.2 },
    { recorded_at: "2024-08-04", body_weight: 83.0, bodyweight_change: 0.4 },
    { recorded_at: "2024-08-05", body_weight: 82.7, bodyweight_change: -0.3 },
    { recorded_at: "2024-08-06", body_weight: 83.2, bodyweight_change: 0.5 },
    { recorded_at: "2024-08-07", body_weight: 82.9, bodyweight_change: -0.3 },
    { recorded_at: "2024-08-08", body_weight: 83.3, bodyweight_change: 0.4 },
    { recorded_at: "2024-08-09", body_weight: 83.0, bodyweight_change: -0.3 },
    { recorded_at: "2024-08-10", body_weight: 83.4, bodyweight_change: 0.4 },
    { recorded_at: "2024-08-11", body_weight: 80.7, bodyweight_change: -6 },
  ];
  return (
    <>
      <section className="flex flex-col 2xl:flex-row gap-3 p-2">
        <BodyWeightChart chartData={chartData} />
        <BodyWeightBarChart chartData={chartData} />
      </section>
      <section className="flex flex-col 2xl:flex-row gap-3 p-2">
        <div className="grow flex flex-col gap-2">
          <AddBodyWeight />
          <BodyWeightHistory />
        </div>

        <div className="2xl:w-[400px]">ads</div>
      </section>
    </>
  );
}
