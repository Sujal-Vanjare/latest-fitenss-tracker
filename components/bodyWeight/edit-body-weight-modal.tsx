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
  body_weight: z
    .number()
    .positive("Body weight must be a positive number")
    .min(1, "Body weight must be at least 1 kg"),
  recorded_at: z.date({ required_error: "Recorded at date is required" }),
});

type EditFormValues = z.infer<typeof EditFormSchema>;

export function EditBodyWeightModal({
  entry,
  onClose,
}: {
  entry: BodyWeightEntry;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const form = useForm<EditFormValues>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      body_weight: entry.body_weight,
      recorded_at: new Date(entry.recorded_at),
    },
  });

  const onSubmit = async (data: EditFormValues) => {
    const supabase = createSupabaseBrowser();
    const { error } = await supabase
      .from("body_weight_entries")
      .update({
        body_weight: data.body_weight,
        recorded_at: data.recorded_at.toISOString(),
      })
      .eq("id", entry.id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Body weight updated successfully!");
      queryClient.invalidateQueries(["body_weight_history"] as any);
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
              name="body_weight"
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
                      />
                    </PopoverContent>
                  </Popover>
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
