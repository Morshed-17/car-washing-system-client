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

export async function uploadToCloudinary(file: File): Promise<string> {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary environment variables are missing");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
}

export const validateImage = (file: File): string | null => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const maxSizeInMB = 5; // Maximum file size in MB
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return "Invalid file type. Only JPG, PNG, and GIF are allowed.";
  }

  if (file.size > maxSizeInBytes) {
    return `File size exceeds ${maxSizeInMB}MB.`;
  }

  return null; // File is valid
};
