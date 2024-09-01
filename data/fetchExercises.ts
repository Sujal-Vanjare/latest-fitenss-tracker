import { createSupabaseBrowser } from "@/lib/supabase/client";

export async function getExercises(categoryName: string) {
  const supabase = createSupabaseBrowser();

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
  const [push, pull, legs] = await Promise.all([
    getExercises("Push"),
    getExercises("Pull"),
    getExercises("Legs"),
  ]);

  return { push, pull, legs };
}
