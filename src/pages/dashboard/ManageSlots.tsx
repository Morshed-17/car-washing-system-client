import { AddSlotModal } from "@/components/dashboard/ManageSlot/AddSlotModal";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetAllSlotsQuery } from "@/redux/api/endpoints/slotApi";

import ChangeSlotStatus from "@/components/dashboard/ManageSlot/ChangeSlotStatus";
import { convertTo12HourFormat } from "@/lib/utils";
import { SlotTableSkeleton } from "@/components/skeletonts/slot-table-skeleton";

export default function ManageSlots() {
  const { data, isLoading } = useGetAllSlotsQuery(undefined);
  const slots = data?.data;

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-4">Slot Management</h1>
        <AddSlotModal />
      </div>
      <Table className="mt-4">
        <TableCaption>Manage and view all slots</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Slot For</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead className="text-right w-[100px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <SlotTableSkeleton />
          ) : (
            slots?.map((slot) => (
              <TableRow key={slot._id}>
                <TableCell className="font-medium">
                  {slot?.service.name as string}
                </TableCell>
                <TableCell>{slot.date}</TableCell>
                <TableCell>{convertTo12HourFormat(slot.startTime)}</TableCell>
                <TableCell>{convertTo12HourFormat(slot.endTime)}</TableCell>
                <TableCell className="text-right">
                  <ChangeSlotStatus status={slot.isBooked} id={slot._id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}
