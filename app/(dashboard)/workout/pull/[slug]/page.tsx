import AddWorkoutWeight from "@/components/workout/add-workout-weight";
import WorkoutBarChart from "@/components/workout/workout-bar-chart";
import WorkoutHistory from "@/components/workout/workout-history";
import WorkoutLineChart from "@/components/workout/workout-line-chart";
import { getExercises } from "@/data/fetchExercises";
import { formatExerciseName } from "@/lib/utils";
import slugify from "slugify";

// Dynamic segments not included in generateStaticParams will return a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const exercises = await getExercises("Pull");

  return exercises.map((exercise) => ({
    slug: slugify(exercise.name, { lower: true }),
  }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const exerciseName = formatExerciseName(params.slug);
  return {
    title: exerciseName,
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const exerciseName = formatExerciseName(params.slug);
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
