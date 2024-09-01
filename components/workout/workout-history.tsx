"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useWorkoutHistory } from "@/hook/useWorkoutHistory";
import { toast } from "sonner";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Skeleton } from "../ui/skeleton";
import { EditWorkoutDataModal } from "./edit-workout-data-modal";

export default function WorkoutHistory({
  exerciseName,
}: {
  exerciseName: string;
}) {
  const { data: history, isLoading, error } = useWorkoutHistory(exerciseName);
  const [selectedEntry, setSelectedEntry] = useState<WorkoutEntry | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  if (isLoading || error || !history || history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workout History</CardTitle>
          <CardDescription>
            Manage your Workout Data and view your growth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Weight</TableHead>
                <TableHead>Recorded at</TableHead>
                <TableHead className="hidden md:table-cell whitespace-pre-wrap">
                  Sets {"             "}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Reps
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 4 }).map((_, index) => (
                <TableRow key={index} className="h-[53px]">
                  <TableCell className="font-medium">
                    <Skeleton className="h-4 w-8 bg-muted/60" />
                  </TableCell>
                  <TableCell className="table-cell">
                    <Skeleton className="h-4 w-24 bg-muted/60" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-7 bg-muted/60" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-7 bg-muted/60" />
                  </TableCell>
                  <TableCell>
                    <MoreHorizontal className="h-4 w-4" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-20 dark:bg-primary/30" />
        </CardFooter>
      </Card>
    );
  }

  const handleEdit = (entry: WorkoutEntry) => {
    setSelectedEntry(entry);
    setEditModalOpen(true);
  };

  const handleDelete = async (entryId: number) => {
    const supabase = createSupabaseBrowser();
    const { error } = await supabase
      .from("workout_entries")
      .delete()
      .eq("id", entryId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Workout Entry deleted successfully!");
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Workout History</CardTitle>
          <CardDescription>
            Manage your Workout Data and view your growth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Weight</TableHead>
                <TableHead>Recorded at</TableHead>
                <TableHead className="hidden md:table-cell whitespace-pre-wrap">
                  Sets {"             "}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Reps
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history?.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {entry.weight} Kg
                  </TableCell>
                  <TableCell>
                    {format(new Date(entry.recorded_at), "PPP")}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {entry.sets}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {entry.total_reps}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEdit(entry)}
                          className="cursor-pointer"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(entry.id)}
                          className="cursor-pointer"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{history?.length}</strong> entries
          </div>
        </CardFooter>
      </Card>
      {isEditModalOpen && selectedEntry && (
        <EditWorkoutDataModal
          entry={selectedEntry}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </>
  );
}
