"use client";

import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useUser from "./useUser";

export function useWorkoutHistory(exerciseName: string) {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  // Function to fetch the workout history
  const fetchWorkoutHistory = async (): Promise<WorkoutEntry[]> => {
    if (!user?.id) return [];

    const supabase = createSupabaseBrowser();
    const { data, error } = await supabase
      .from("workout_entries")
      .select("id, recorded_at, weight, sets, total_reps")
      .eq("user_id", user.id)
      .eq("exercise_name", exerciseName)
      .order("recorded_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  };

  const queryKey: [string] = [exerciseName];

  // Query to fetch data
  const query = useQuery({
    queryKey,
    queryFn: fetchWorkoutHistory,
    enabled: !!user?.id && !!exerciseName,
  });

  // Set up Realtime subscription
  useEffect(() => {
    if (!user?.id) return;

    const supabase = createSupabaseBrowser();
    const channel = supabase
      .channel(`workout_entries:${user.id}:${exerciseName}`)
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events: INSERT, UPDATE, DELETE
          schema: "public",
          table: "workout_entries",
        },
        (payload) => {
          // Invalidate the query to refetch data
          queryClient.invalidateQueries({
            queryKey,
          });
        }
      )
      .subscribe();

    return () => {
      // Cleanup subscription on unmount
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient, queryKey]);

  return query;
}
