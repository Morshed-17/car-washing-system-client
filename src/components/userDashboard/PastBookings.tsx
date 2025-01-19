import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { convertTo12HourFormat } from "@/lib/utils"

interface PastBooking {
  slot: {
    _id: string
    service: {
      name: string
    }
    date: string
    startTime: string
    endTime: string
  }
  paymentStatus: string
  transactionId: string
  totalPrice: number
}

interface PastBookingsProps {
  bookings: PastBooking[]
  isLoading: boolean
  isError: boolean
}

export function PastBookings({ bookings, isLoading, isError }: PastBookingsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "Failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-8 w-full" />
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load bookings. Please try again later.</p>
        ) : bookings && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Service</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Time</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">TXID</th>
                  <th className="text-right p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.slot._id} className="border-b">
                    <td className="p-2">{booking.slot.service.name}</td>
                    <td className="p-2">
                      {new Date(booking.slot.date).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {convertTo12HourFormat(booking.slot.startTime)} -{" "}
                      {convertTo12HourFormat(booking.slot.endTime)}
                    </td>
                    <td className="p-2">
                      <Badge
                        variant="outline"
                        className={getStatusColor(booking.paymentStatus)}
                      >
                        {booking.paymentStatus}
                      </Badge>
                    </td>
                    <td className="p-2">{booking.transactionId}</td>
                    <td className="p-2 text-right">${booking.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No past bookings found.</p>
        )}
      </CardContent>
    </Card>
  )
}

