import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useDeleteServiceMutation } from "@/redux/api/endpoints/serviceApi";
import { toast } from "sonner";
import { ApiError } from "@/types";

export function DeleteServiceModal({ serviceId }: { serviceId: string }) {
  const [deleteService] = useDeleteServiceMutation();

  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    
    try {
      const result = await deleteService({ serviceId }).unwrap();
      console.log(result)
      toast.success(result.message);
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>The service will be deleted !!</DialogDescription>
        </DialogHeader>
        <Button onClick={handleDelete} variant="destructive">
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
