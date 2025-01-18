import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetAllServicesQuery } from "@/redux/api/endpoints/serviceApi";
import { format } from "date-fns";
import { useAddSlotMutation } from "@/redux/api/endpoints/slotApi";
import { ApiError } from "@/types";
import { toast } from "sonner";
import DatePickerComponent from "@/components/shared/DatePickerComponent";

export function AddSlotModal() {
  const [open, setOpen] = useState(false);
  const { data } = useGetAllServicesQuery({}); // Fetch services
  const [addSlot] = useAddSlotMutation();
  const services = data?.data?.data;
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleSubmit = async () => {
    if (!selectedService || !date || !startTime || !endTime) {
      toast.error("please fill all the fields");
      return;
    }

    const payload = {
      service: selectedService,
      date: format(date, "yyyy-MM-dd"), // Format date for the backend
      startTime,
      endTime,
    };
    try {
      const result = await addSlot(payload).unwrap();
      if (result.success) {
        toast.success("Slots added successfully");
      }
      console.log(result);
    } catch (err) {
      const error = err as ApiError;
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Slot</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Slot</DialogTitle>
          <DialogDescription>
            Select a service and define the date and time for the slot.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Service Dropdown */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service" className="text-right">
              Service
            </Label>
            <Select onValueChange={setSelectedService}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services?.map((service: any) => (
                  <SelectItem key={service._id} value={service._id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Picker */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <DatePickerComponent date={date} setDate={setDate} />
          </div>

          {/* Start Time */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">
              Start Time
            </Label>
            <Input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* End Time */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right">
              End Time
            </Label>
            <Input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Create slot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
