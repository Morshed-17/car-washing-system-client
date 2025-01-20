import { useGetAllBookingsQuery } from "@/redux/api/endpoints/bookingApi";

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

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { convertTo12HourFormat } from "@/lib/utils";
import { BookingTableSkeleton } from "@/components/skeletonts/booking-table-skeleton";

const PaymentStatusBadge = ({
  status,
}: {
  status: "Pending" | "Paid" | "Failed";
}) => {
  const badgeStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Paid: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-sm font-medium ${badgeStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default function ManageBookings() {
    // Fetch all bookings
    const { data, isLoading } = useGetAllBookingsQuery(undefined);
    const bookings = data?.data;
  
    // Calculate total price
    const totalPrice =
      bookings?.reduce((acc, booking) => acc + booking.totalPrice, 0) || 0;
  
    return (
      <div className="flex flex-col min-h-[calc(100vh-100px)]">
        <h1 className="text-xl font-bold mb-4">Booking Management</h1>
        <div className="flex-1 overflow-auto">
          <Table className="w-full">
            <TableCaption>Manage and view all bookings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <BookingTableSkeleton />
              ) : (
                <>
                  {bookings?.map((booking) => (
                    <TableRow key={booking.transactionId}>
                      <TableCell className="font-medium">
                        {booking?.user?.email}
                      </TableCell>
                      <TableCell>
                        {booking.slot.service.name} <br />
                        {booking.slot.date} <br />
                        {convertTo12HourFormat(booking.slot.startTime)} -{" "}
                        {convertTo12HourFormat(booking.slot.endTime)}
                      </TableCell>
                      <TableCell>
                        <PaymentStatusBadge status={booking.paymentStatus} />
                      </TableCell>
                      <TableCell>{booking.transactionId}</TableCell>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${booking.totalPrice.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} className="font-bold">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">
                  ${totalPrice.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <Pagination className="mt-6 self-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
  