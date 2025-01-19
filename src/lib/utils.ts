import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertTo12HourFormat = (time: string): string => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // Convert 0 or 24 to 12
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
};

export function sortBookings(bookings: any[]) {
  const now = new Date();

  const pastBookings = bookings?.filter((booking) => {
    const bookingDateTime = new Date(
      `${booking?.slot.date}T${booking?.slot.endTime}`
    );
    return bookingDateTime < now;
  });

  const upcomingBookings = bookings?.filter((booking) => {
    const bookingDateTime = new Date(
      `${booking?.slot.date}T${booking?.slot.endTime}`
    );
    return bookingDateTime >= now;
  });

  return { pastBookings, upcomingBookings };
}
