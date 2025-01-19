import { Link } from "react-router";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import useAuth from "@/hooks/useAuth";
import { useGetMyBookingQuery } from "@/redux/api/endpoints/bookingApi";
import { CountdownTimer } from "../CountdownTimer";

export function Navbar() {
  const scrollDirection = useScrollDirection();
  const { user } = useAuth();

  const { data } = useGetMyBookingQuery(undefined, { skip: !user });
  const bookings = data?.data;

  // Find the immediate next booking
  const nextBooking = bookings
    ?.filter(
      (booking) =>
        new Date(`${booking.slot.date}T${booking.slot.startTime}`) > new Date()
    )
    ?.sort(
      (a, b) =>
        new Date(`${a.slot.date}T${a.slot.startTime}`).getTime() -
        new Date(`${b.slot.date}T${b.slot.startTime}`).getTime()
    )[0];

  // Create targetDateTime for CountdownTimer
  const targetDateTime = nextBooking
    ? `${nextBooking.slot.date}T${nextBooking.slot.startTime}:00`
    : null;

  return (
    <header
      className={`sticky ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      } transition-all duration-500 bg-background z-50 border-b`}
    >
      {/* Show timer if a next slot is available */}
      {targetDateTime && (
        <div className="text-sm font-medium container flex items-center justify-center py-3 px-4 mx-auto border-b gap-1">
          <h3>Your Next Booking In :</h3>
          <CountdownTimer
            targetDate={targetDateTime}
            className="text-primary"
          />
        </div>
      )}
      <div className="container flex items-center justify-between h-16 px-4 mx-auto ">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold "
        >
          <span className="text-primary">Car</span>Wash
        </Link>

        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
