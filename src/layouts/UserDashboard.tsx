import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { ArrowLeft, HomeIcon as House } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import { useGetMyBookingQuery } from "@/redux/api/endpoints/bookingApi"
import { sortBookings } from "@/lib/utils"
import { UserProfile } from "@/components/userDashboard/UserProfile"
import { PastBookings } from "@/components/userDashboard/PastBookings"
import { UpcomingBookings } from "@/components/userDashboard/UpcomingBookings"

const UserDashboard = () => {
  const { user: currentUser } = useAuth()
  const { data, isLoading, isError } = useGetMyBookingQuery(undefined)
  const bookings = data?.data

  const { upcomingBookings, pastBookings } = sortBookings(bookings!)

  return (
    <Container className="py-8 space-y-6">
      <Button size="sm" asChild>
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <House className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </Button>

      <UserProfile user={currentUser!} />
      <UpcomingBookings bookings={upcomingBookings} isLoading={isLoading} isError={isError} />
      <PastBookings bookings={pastBookings} isLoading={isLoading} isError={isError} />
    </Container>
  )
}

export default UserDashboard

