import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateSlotStatusMutation } from "@/redux/api/endpoints/slotApi";
import { SlotStatus } from "@/types";
function ChangeSlotStatus({ status, id }: { status: string; id: string }) {
  const [value, setValue] = useState(status);
  const [changeSlotStatus] = useUpdateSlotStatusMutation();

  useEffect(() => {
    changeSlotStatus({
      id,
      isBooked: value as SlotStatus,
    }).unwrap();
  }, [value]);

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        disabled={value === "booked"}
        className={`${
          value === "cancelled"
            ? "bg-secondary"
            : value === "booked" && "bg-destructive"
        } `}
      >
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value="available">AVAILABLE</SelectItem>
          <SelectItem value="cancelled">CANCELLED</SelectItem>
          <SelectItem value="booked" disabled>
            BOOKED
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ChangeSlotStatus;
