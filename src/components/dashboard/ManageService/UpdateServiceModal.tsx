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
import UpdateServiceForm from "./UpdateServiceForm";
import { Edit2 } from "lucide-react";

export function UpdateServiceModal({ _id }: { _id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Edit2></Edit2>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Give Updated service info</DialogTitle>
          <DialogDescription>
            The current service will be updated
          </DialogDescription>
        </DialogHeader>
        <UpdateServiceForm onClose={() => setOpen(false)} _id={_id} />
      </DialogContent>
    </Dialog>
  );
}
