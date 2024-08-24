import { createSupabaseServer } from "@/lib/supabase/server";

export async function getExercises(categoryName: string) {
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("category_name", categoryName)
    .order("order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllExercises() {
  const supabase = createSupabaseServer();

  const [push, pull, legs] = await Promise.all([
    getExercises("Push"),
    getExercises("Pull"),
    getExercises("Legs"),
  ]);

  return { push, pull, legs };
}
