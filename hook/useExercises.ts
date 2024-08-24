"use client";

import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function useExercises(categoryName: string) {
  return useQuery({
    queryKey: ["exercises", categoryName], // Cache by category name
    queryFn: async () => {
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
    },
    enabled: !!categoryName, // Only run the query if categoryName is provided
  });
}
