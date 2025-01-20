import { useGetAllBookingsQuery } from "@/redux/api/endpoints/bookingApi";
import { useGetAllUsersQuery } from "@/redux/api/endpoints/authApi";
import { sortBookings } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Loader2, Users, CreditCard } from "lucide-react";

import { UpcomingBookings } from "@/components/userDashboard/UpcomingBookings";

export default function Dashboard() {
  const {
    data: booking,
    isLoading: isLoadingBookings,
    isError: isBookingsError,
  } = useGetAllBookingsQuery(undefined);
  const { data: user, isLoading: isLoadingUsers } =
    useGetAllUsersQuery(undefined);

  const bookingsData = booking?.data;
  const usersData = user?.data;

  const totalBookings = bookingsData?.length || 0;
  const totalUsers = usersData?.length || 0;
  const totalRevenue =
    bookingsData?.reduce((acc, booking) => acc + booking.totalPrice, 0) || 0;

  // Get upcoming bookings (from current time)

  const { upcomingBookings } = sortBookings(bookingsData!);

  // Payment statistics
  const paymentStats =
    bookingsData?.reduce((acc, booking) => {
      acc[booking.paymentStatus] = (acc[booking.paymentStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

  if (isLoadingBookings || isLoadingUsers) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">
          Dashboard Overview
        </h1>
        <Card className="w-auto">
          <CardContent className="py-3">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium ">
                  Welcome back
                </p>
                <p className="text-lg font-semibold">Administrator</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium ">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Total Bookings</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-sm  mt-2">
              Revenue: $
              {totalRevenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium ">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Total Users</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-sm  mt-2">
              Active in last 24h: N/A
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium ">
              Payment Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-sm font-medium text-yellow-600">
                  Pending
                </span>
                <p className="text-xl font-bold mt-1">
                  {paymentStats["Pending"] || 0}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-green-600">Paid</span>
                <p className="text-xl font-bold mt-1">
                  {paymentStats["Paid"] || 0}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-red-600">Failed</span>
                <p className="text-xl font-bold mt-1">
                  {paymentStats["Failed"] || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings Section */}
      <UpcomingBookings
        bookings={upcomingBookings}
        isLoading={isLoadingBookings}
        isError={isBookingsError}
      />
    </div>
  );
}
