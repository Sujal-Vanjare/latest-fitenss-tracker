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
import { useBodyWeightHistory } from "@/app/hook/useBodyWeightHistory";
import { EditBodyWeightModal } from "./edit-body-weight-modal";
import { toast } from "sonner";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export default function BodyWeightHistory() {
  const { data: history, isLoading, error } = useBodyWeightHistory();
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (entry: any) => {
    setSelectedEntry(entry);
    setEditModalOpen(true);
  };

  const handleDelete = async (entryId: number) => {
    const supabase = createSupabaseBrowser();
    const { error } = await supabase
      .from("body_weight_entries")
      .delete()
      .eq("id", entryId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Body weight deleted successfully!");
      queryClient.invalidateQueries(["body_weight_history"] as any);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Body Weight History</CardTitle>
          <CardDescription>
            Manage your bodyweight and view your growth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Weight</TableHead>
                <TableHead>Recorded at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history?.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {entry.body_weight} Kg
                  </TableCell>
                  <TableCell className="table-cell">
                    {format(new Date(entry.recorded_at), "PPP")}
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
                        <DropdownMenuItem onClick={() => handleEdit(entry)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(entry.id)}
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
            Showing <strong>1-{history?.length}</strong> of{" "}
            <strong>{history?.length}</strong> entries
          </div>
        </CardFooter>
      </Card>
      {isEditModalOpen && selectedEntry && (
        <EditBodyWeightModal
          entry={selectedEntry}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </>
  );
}
