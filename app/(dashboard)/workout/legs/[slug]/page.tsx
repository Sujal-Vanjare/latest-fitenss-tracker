import AddWorkoutWeight from "@/components/workout/add-workout-weight";
import WorkoutBarChart from "@/components/workout/workout-bar-chart";
import WorkoutHistory from "@/components/workout/workout-history";
import WorkoutLineChart from "@/components/workout/workout-line-chart";

export default function Page({ params }: { params: { slug: string } }) {
  const exerciseName = params.slug
    .split("-") // Split the slug into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words with spaces

  return (
    <>
      <section className="flex flex-col 2xl:flex-row gap-3 p-2">
        <WorkoutLineChart exerciseName={exerciseName} />
        <WorkoutBarChart exerciseName={exerciseName} />
      </section>
      <section className="flex flex-col 2xl:flex-row gap-3 p-2">
        <div className="grow flex flex-col gap-2">
          <AddWorkoutWeight exerciseName={exerciseName} />
          <WorkoutHistory exerciseName={exerciseName} />
        </div>

        <div className="2xl:w-[400px]"></div>
      </section>
    </>
  );
}
