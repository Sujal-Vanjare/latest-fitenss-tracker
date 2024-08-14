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
import useUser from "@/app/hook/useUser";

// Define the schema for form validation using zod
const FormSchema = z.object({
  recorded_at: z.date({ required_error: "Recorded at date is required" }), // Date is now required
  body_weight: z
    .number()
    .positive("Body weight must be a positive number")
    .min(1, "Body weight must be at least 1 kg"),
});

export default function AddBodyWeight() {
  // user data
  const { data } = useUser();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { recorded_at: undefined }, // Remove default value for body_weight
  });

  // Form submission handler
  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const supabase = createSupabaseBrowser();
    if (!isPending) {
      startTransition(async () => {
        // Convert the body_weight to a number
        const bodyWeight = Number(formData.body_weight);

        // Convert date to ISO string before storing in the database
        const recordedAt = formData.recorded_at.toISOString();

        // Retrieve the most recent weight entry for the user
        const { data: previousEntries, error: fetchError } = await supabase
          .from("body_weight_entries")
          .select("body_weight")
          .eq("user_id", data?.id)
          .order("recorded_at", { ascending: false })
          .limit(1);
        console.log(previousEntries);

        if (fetchError) {
          toast.error(fetchError.message);
          return;
        }

        // Check if there are previous entries
        const previousEntry = previousEntries?.[0];

        // Calculate weight change
        const bodyweightChange = previousEntry
          ? bodyWeight - previousEntry.body_weight
          : null;

        // Insert the new entry
        const { error: insertError } = await supabase
          .from("body_weight_entries")
          .insert([
            {
              user_id: data?.id, // Add user_id to the new entry
              recorded_at: recordedAt,
              body_weight: bodyWeight,
              bodyweight_change: bodyweightChange, // Ensure this matches the column name in your table
            },
          ]);

        if (insertError) {
          toast.error(insertError.message);
        } else {
          toast.success("Body weight added successfully!");
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
          className="flex flex-col items-center md:flex-row gap-4"
        >
          <FormField
            control={form.control}
            name="body_weight"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Add Body Weight</FormLabel>
                <FormControl>
                  <Input
                    className="py-2 pl-3 pr-4 text-left font-normal"
                    placeholder="Weight should be in Kg"
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number on change
                    required
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

          <Button
            type="submit"
            className="md:mt-[22px] w-full h-9 flex items-center gap-2"
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
