import AddBodyWeight from "@/components/bodyWeight/add-body-weight";
import BodyWeightBarChart from "@/components/bodyWeight/body-weight-bar-chart";
import BodyWeightChart from "@/components/bodyWeight/body-weight-chart";
import BodyWeightHistory from "@/components/bodyWeight/body-weight-history";

export default function Page() {
  return (
    <>
      <section className="flex flex-col 2xl:flex-row gap-3 p-2">
        <BodyWeightChart />
        <BodyWeightBarChart />
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
