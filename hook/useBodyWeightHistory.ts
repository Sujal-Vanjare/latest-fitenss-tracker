"use client";

import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useUser from "./useUser";

export function useBodyWeightHistory() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  // Function to fetch the body weight history
  const fetchBodyWeightHistory = async (): Promise<BodyWeightEntry[]> => {
    if (!user?.id) return [];

    const supabase = createSupabaseBrowser();
    const { data, error } = await supabase
      .from("body_weight_entries")
      .select("id, recorded_at, body_weight")
      .eq("user_id", user.id)
      .order("recorded_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  };

  const queryKey: [string, string] = [
    "body_weight_history",
    user?.user_metadata?.name || "",
  ];

  // Query to fetch data
  const query = useQuery({
    queryKey,
    queryFn: fetchBodyWeightHistory,
    enabled: !!user?.id,
  });

  // Set up Realtime subscription
  useEffect(() => {
    if (!user?.id) return;

    const supabase = createSupabaseBrowser();
    const channel = supabase
      .channel(`body_weight_entries:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events: INSERT, UPDATE, DELETE
          schema: "public",
          table: "body_weight_entries",
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
