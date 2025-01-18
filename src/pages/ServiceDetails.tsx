import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/ui/Container";
import { useGetSingleServiceQuery } from "@/redux/api/endpoints/serviceApi";
import { useGetAllSlotsQuery } from "@/redux/api/endpoints/slotApi";
import { useParams } from "react-router";
import { Slot } from "@/types";
import SectionTitle from "@/components/ui/SectionTitle";
import { convertTo12HourFormat } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  BadgeDollarSign,
  Clock3,
} from "lucide-react";
import DatePickerComponent from "@/components/shared/DatePickerComponent";

const ServiceDetails = () => {
  const { id } = useParams();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [queryDate, setQueryDate] = useState(format(today, "yyyy-MM-dd"));

  const {
    data: serviceData,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetSingleServiceQuery({
    serviceId: id as string,
  });

  useEffect(() => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      if (formattedDate !== queryDate) {
        setSelectedSlot(null);
        setQueryDate(formattedDate);
      }
    }
  }, [date, queryDate]);

  const {
    data: slotData,
    error: slotError,
    isLoading: slotLoading,
    isFetching: slotFetching,
  } = useGetAllSlotsQuery({
    serviceId: id,
    date: queryDate,
  });

  const service = serviceData?.data;
  const slots = slotData?.data;

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleBookNow = () => {
    console.log(`Booking slot: ${selectedSlot}`);
  };

  const renderServiceDetails = () => {
    if (serviceLoading) {
      return (
        <>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-40" />
          </div>
        </>
      );
    }

    if (serviceError) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Unable to load service details. Please try again later.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <>
        <CardTitle className="text-2xl">{service?.name}</CardTitle>
        <CardDescription className="text-base mt-2">
          {service?.description}
        </CardDescription>
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-lg">
            <BadgeDollarSign className="h-5 w-5 text-primary" />
            <span className="font-medium">${service?.price}</span>
          </div>
          <div className="flex items-center gap-2 text-lg">
            <Clock3 className="h-5 w-5 text-primary" />
            <span className="font-medium">{service?.duration} minutes</span>
          </div>
        </div>
      </>
    );
  };

  const renderSlots = () => {
    if (slotLoading || slotFetching) {
      return (
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      );
    }

    if (slotError) {
      return (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unavailable</AlertTitle>
          <AlertDescription>
            This service is not available for the selected date. Please try
            another date.
          </AlertDescription>
        </Alert>
      );
    }

    if (!slots?.length) {
      return (
        <Alert className="mt-2">
          <Calendar className="h-4 w-4" />
          <AlertTitle>No Available Slots</AlertTitle>
          <AlertDescription>
            No appointments available for{" "}
            {format(date? date : "", "MMMM d, yyyy") || "This Date"}. Please select
            another date.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot: Slot) => (
          <Button
            key={slot._id}
            variant={slot.isBooked === "booked" ? "secondary" : "outline"}
            disabled={slot.isBooked === "booked"}
            onClick={() => handleSlotSelect(slot._id)}
            className={`
              h-auto py-3 px-4 flex flex-col items-center gap-2
              transition-all duration-200 hover:scale-102
              ${
                selectedSlot === slot._id
                  ? "ring-2 ring-primary border-primary"
                  : ""
              }
              ${slot.isBooked === "booked" ? "opacity-50" : ""}
            `}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              {format(new Date(slot.date), "MMM dd, yyyy")}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              {convertTo12HourFormat(slot.startTime)} -{" "}
              {convertTo12HourFormat(slot.endTime)}
            </div>
            {slot.isBooked === "booked" && (
              <span className="text-xs text-muted-foreground mt-1">Booked</span>
            )}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Container className="min-h-[calc(100vh-64px)] py-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Schedule Your Appointment"
          subtitle="Choose your preferred date and time slot below."
        />
        <Card className="mt-6 shadow-lg">
          <CardHeader className="space-y-4">
            {renderServiceDetails()}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Select Date
              </h3>
              <DatePickerComponent
                date={date}
                setDate={setDate}
                buttonText="Choose a date"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Available Time Slots
              </h3>
              {renderSlots()}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 mt-4">
            <Button
              onClick={handleBookNow}
              disabled={!selectedSlot}
              className="w-full py-6 text-lg font-medium"
            >
              {slotLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
};

export default ServiceDetails;
