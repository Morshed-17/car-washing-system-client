import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddServiceForm from "./AddServiceForm";
import { useState } from "react";

export function AddServiceModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Service</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Give Service Info</DialogTitle>
          <DialogDescription>
            A new service will be added in your app.
          </DialogDescription>
        </DialogHeader>
        <AddServiceForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
