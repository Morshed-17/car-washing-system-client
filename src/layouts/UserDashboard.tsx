import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  House,
  ArrowLeft,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import useAuth from "@/hooks/useAuth";
import { UpdateUserModal } from "@/components/userDashboard/UpdateUserModal";

// Types from your schema
type TBooking = {
  user?: string;
  slot: Slot;
  paymentStatus: "Pending" | "Paid" | "Failed";
  transactionId: string;
  totalPrice: number;
  createdAt: string;
};

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Slot {
  _id: string;
  service: Service;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "cancelled";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const mockBookings: TBooking[] = [
  {
    user: "1",
    slot: {
      _id: "1",
      service: {
        _id: "1",
        name: "Premium Haircut",
        description: "Professional haircut service",
        price: 50,
        duration: 60,
        isDeleted: false,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
        __v: 0,
      },
      date: "2024-01-25T10:00:00Z",
      startTime: "10:00",
      endTime: "11:00",
      isBooked: "booked",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      __v: 0,
    },
    paymentStatus: "Paid",
    transactionId: "txn_123456",
    totalPrice: 50,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    user: "1",
    slot: {
      _id: "2",
      service: {
        _id: "2",
        name: "Spa Treatment",
        description: "Relaxing spa session",
        price: 80,
        duration: 90,
        isDeleted: false,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
        __v: 0,
      },
      date: "2024-02-01T14:00:00Z",
      startTime: "14:00",
      endTime: "15:30",
      isBooked: "booked",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      __v: 0,
    },
    paymentStatus: "Pending",
    transactionId: "txn_123457",
    totalPrice: 80,
    createdAt: "2024-01-15T10:00:00Z",
  },
];

const UserDashboard = () => {
  const { user: currentUser } = useAuth();

  const upcomingBookings = mockBookings.filter(
    (booking) => new Date(booking.slot.date) > new Date()
  );

  const pastBookings = mockBookings.filter(
    (booking) => new Date(booking.slot.date) <= new Date()
  );

  const getCountdown = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

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

  return (
    <Container className="flex h-screen items-center justify-center">
      <div className="p-6 space-y-6 w-full">
        <Button size="sm">
          <Link to="/" className="flex gap-3">
            {" "}
            <ArrowLeft />
            <House />
          </Link>
        </Button>
        {/* User Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser?.name}`}
              />
              <AvatarFallback>
                {currentUser?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{currentUser?.name} <UpdateUserModal/></h3>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{currentUser?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{currentUser?.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{currentUser?.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bookings Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingBookings.map((booking) => (
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
                        <span>
                          {new Date(booking.slot.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {booking.slot.startTime} - {booking.slot.endTime}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      Starts {getCountdown(booking.slot.date)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Past Bookings Section */}
        <Card>
          <CardHeader>
            <CardTitle>Past Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Service</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-right p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pastBookings.map((booking) => (
                    <tr key={booking.slot._id} className="border-b">
                      <td className="p-2">{booking.slot.service.name}</td>
                      <td className="p-2">
                        {new Date(booking.slot.date).toLocaleDateString()}
                      </td>
                      <td className="p-2">
                        {booking.slot.startTime} - {booking.slot.endTime}
                      </td>
                      <td className="p-2">
                        <Badge
                          variant="outline"
                          className={getStatusColor(booking.paymentStatus)}
                        >
                          {booking.paymentStatus}
                        </Badge>
                      </td>
                      <td className="p-2 text-right">${booking.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default UserDashboard;
