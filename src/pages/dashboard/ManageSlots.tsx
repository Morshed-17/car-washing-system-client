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
import { useEffect, useState } from "react";
import { format } from "date-fns";
import DatePickerComponent from "@/components/shared/DatePickerComponent";
import NoDataFound from "@/components/shared/NoDataFound";

export default function ManageSlots() {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [queryDate, setQueryDate] = useState(format(today, "yyyy-MM-dd"));
  const { data, isLoading, error } = useGetAllSlotsQuery({ date: queryDate });
  const slots = data?.data;

  useEffect(() => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      if (formattedDate !== queryDate) {
        setQueryDate(formattedDate);
      }
    }
  }, [date, queryDate]);

  console.log(date);

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-4">Slot Management</h1>
        <div className="flex gap-4">
          <AddSlotModal />
          <DatePickerComponent
            date={date}
            setDate={setDate}
            buttonText="Choose a date"
            disabled={false}
          />
        </div>
      </div>
      {error ? (
        <NoDataFound />
      ) : (
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
      )}
    </div>
  );
}
