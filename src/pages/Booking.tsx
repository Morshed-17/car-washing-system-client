import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, Clock, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleSlotQuery } from "@/redux/api/endpoints/slotApi";
import { convertTo12HourFormat } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { useParams } from "react-router";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useCreateBookingMutation } from "@/redux/api/endpoints/bookingApi";
import { toast } from "sonner";

export default function BookingPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [bookService] = useCreateBookingMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const {
    data: slotData,
    isLoading: slotLoading,
    error: slotError,
  } = useGetSingleSlotQuery(id!);

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const slot = slotData?.data;
  const service = slot?.service;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (user?.role === "admin") {
      toast.error("Plase login as a user for booking");
    }
    e.preventDefault();
    // Send only required data to backend
    const bookingData = {
      user: user!._id,
      slot: id!,
    };
    try {
      const result = await bookService(bookingData).unwrap();
      console.log(result?.data);
      window.location.href = result?.data?.payment_url;
    } catch (err) {
      console.log(err);
    }
  };

  if (slotError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md w-full">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Unable to load booking details. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Book Your Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Service Summary */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Booking Summary</h3>
              {slotLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-500">Service</h4>
                      <p className="text-lg font-semibold">{service?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-500">
                        Appointment Time
                      </h4>
                      <p className="font-semibold">
                        {format(new Date(slot?.date!), "MMMM d, yyyy")}
                      </p>
                      <p>
                        {convertTo12HourFormat(slot?.startTime!)} -{" "}
                        {convertTo12HourFormat(slot?.endTime!)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaBangladeshiTakaSign className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-500">Price</h4>
                      <p className="text-lg font-semibold">
                        {service?.price}Tk
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Booking Form */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Information</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium  mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    disabled
                    className=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium  mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium  mb-1"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    disabled
                    className=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium  mb-1"
                  >
                    Phone
                  </label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    disabled
                    className=""
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full py-6 text-lg font-medium mt-4"
                  disabled={slotLoading}
                >
                  {slotLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  )}
                  Confirm Booking - {service?.price} TK
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          By confirming this booking, you agree to our terms of service and
          cancellation policy.
        </CardFooter>
      </Card>
    </div>
  );
}
