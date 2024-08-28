"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useTransition } from "react";
import { Card } from "../ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import useUser from "@/hook/useUser";

// Define the schema for form validation using zod
const FormSchema = z.object({
  recorded_at: z.date({ required_error: "Recorded at date is required" }),
  weight: z
    .number()
    .positive("Workout weight must be a positive number")
    .min(0.5, "Workout weight must be at least 1 kg")
    .max(1000, "Workout weight cannot exceed 999.9 kg"), // No need for further refinement here
  sets: z
    .number()
    .positive("Workout sets must be a positive number")
    .int("Workout sets must be a whole number")
    .min(1, "Workout sets must be at least 1 set")
    .max(10, "Workout sets cannot exceed 10"),
  total_reps: z
    .number()
    .int("Sets must be an integer")
    .positive("Sets must be a positive number")
    .min(1, "Sets must be at least 1")
    .max(100, "Workout sets cannot exceed 10"),
});

export default function AddWorkoutWeight({
  exerciseName,
}: {
  exerciseName: string;
}) {
  // user data
  const { data: user } = useUser();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { recorded_at: undefined }, // No default value for recorded_at
  });

  // Form submission handler
  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const supabase = createSupabaseBrowser();
    if (!isPending) {
      startTransition(async () => {
        // Adjust the date to remove timezone effects
        const recordedAt = new Date(formData.recorded_at);
        recordedAt.setMinutes(
          recordedAt.getMinutes() - recordedAt.getTimezoneOffset()
        );

        // Insert the new entry
        const { error: insertError } = await supabase
          .from("workout_entries")
          .insert([
            {
              user_id: user?.id, // Add user_id to the new entry
              exercise_name: exerciseName, // Pass the exercise name
              weight: formData.weight, // Use the weight from formData
              sets: formData.sets, // Use sets from formData
              total_reps: formData.total_reps,
              recorded_at: recordedAt.toISOString(),
            },
          ]);

        if (insertError) {
          toast.error(insertError.message);
        } else {
          toast.success("Workout data added successfully!");
          form.reset(); // Reset the form after successful submission
        }
      });
    }
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-4"
        >
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Add Workout Weight</FormLabel>
                <FormControl>
                  <Input
                    className="py-2 pl-3 pr-4 text-left font-normal"
                    placeholder="Weight should be in Kg"
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number on change
                    required
                    min={0.5}
                    max={1000}
                    step={0.5}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recorded_at"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Recorded at</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sets"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col lg:col-start-1 lg:col-end-2">
                <FormLabel>Sets</FormLabel>
                <FormControl>
                  <Input
                    className="py-2 pl-3 pr-4 text-left font-normal"
                    placeholder="0"
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number on change
                    required
                    min={1}
                    max={10}
                    step={1}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="total_reps"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col lg:col-start-2 lg:col-end-3">
                <FormLabel>Total Reps</FormLabel>
                <FormControl>
                  <Input
                    className="py-2 pl-3 pr-4 text-left font-normal"
                    placeholder="0"
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number on change
                    required
                    min={1}
                    max={100}
                    step={1}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="md:mt-[22px] w-full h-9 flex items-center gap-2 md:col-start-2 md:col-end-3 lg:col-start-3 lg:col-end-4"
          >
            <AiOutlineLoading3Quarters
              className={cn(!isPending ? "hidden" : "block animate-spin")}
            />
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}
