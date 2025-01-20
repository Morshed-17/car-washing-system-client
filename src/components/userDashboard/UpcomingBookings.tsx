import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";

import { convertTo12HourFormat } from "@/lib/utils";
import { BookingSkeleton } from "../skeletonts/BookingSkeleton";
import { CountdownTimer } from "../shared/CountdownTimer";
import { Service } from "@/types";

interface UpcomingBooking {
  slot: {
    _id: string;
    service: Service;
    date: string;
    startTime: string;
    endTime: string;
  };
  paymentStatus: string;
  transactionId: string;
}

interface UpcomingBookingsProps {
  bookings: UpcomingBooking[];
  isLoading: boolean;
  isError: boolean;
}

export function UpcomingBookings({
  bookings,
  isLoading,
  isError,
}: UpcomingBookingsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  console.log(bookings)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <BookingSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">
            Failed to load bookings. Please try again later.
          </p>
        ) : bookings && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <Card key={booking.slot._id} className="bg-white">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">
                      {booking.slot.service.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className={getStatusColor(booking.paymentStatus)}
                    >
                      {booking.paymentStatus}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{booking.slot.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {convertTo12HourFormat(booking.slot.startTime)} -{" "}
                        {convertTo12HourFormat(booking.slot.endTime)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">TXID:</span>{" "}
                      {booking.transactionId}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    Starts in:{" "}
                    <CountdownTimer
                      targetDateTime={`${booking.slot.date}T${booking.slot.startTime}:00`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No upcoming bookings found.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
