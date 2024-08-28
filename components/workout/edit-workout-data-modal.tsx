import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Define the schema for form validation using zod
const EditFormSchema = z.object({
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

type EditFormValues = z.infer<typeof EditFormSchema>;

export function EditWorkoutDataModal({
  entry,
  onClose,
  exerciseName,
}: {
  exerciseName: string;
  entry: WorkoutEntry;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const form = useForm<EditFormValues>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      weight: entry.weight,
      sets: entry.sets,
      total_reps: entry.total_reps,
      recorded_at: new Date(entry.recorded_at),
    },
  });

  const onSubmit = async (data: EditFormValues) => {
    const supabase = createSupabaseBrowser();

    // Adjust the date to remove timezone effects
    const adjustedDate = new Date(data.recorded_at);
    adjustedDate.setMinutes(
      adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset()
    );

    const { error } = await supabase
      .from("workout_entries")
      .update({
        weight: data.weight,
        sets: data.sets,
        total_reps: data.total_reps,
        recorded_at: adjustedDate.toISOString(),
      })
      .eq("id", entry.id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Workout entry updated successfully!");
      queryClient.invalidateQueries({
        queryKey: [{ exerciseName }],
      });
      onClose();
    }
  };
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Body Weight</DialogTitle>
          <DialogDescription>
            Modify the details of your body weight entry.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Body Weight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Weight in Kg"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
                <FormItem className="mb-4 flex flex-col">
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
                        defaultMonth={field.value || new Date()} // Use defaultMonth for initial focus
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
                <FormItem className="mb-4">
                  <FormLabel>Sets</FormLabel>
                  <FormControl>
                    <Input
                      className="py-2 pl-3 pr-4 text-left font-normal"
                      placeholder="Weight should be in Kg"
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
                <FormItem className="mb-4">
                  <FormLabel>Total Reps</FormLabel>
                  <FormControl>
                    <Input
                      className="py-2 pl-3 pr-4 text-left font-normal"
                      placeholder="Weight should be in Kg"
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

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="mb-1.5 sm:mb-0">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
