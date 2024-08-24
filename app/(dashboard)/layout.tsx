import { Dashboard } from "@/components/dashboard";
import { getAllExercises } from "@/data/fetchExercises";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const exercises = await getAllExercises();
  return <Dashboard exercises={exercises}>{children}</Dashboard>;
}
