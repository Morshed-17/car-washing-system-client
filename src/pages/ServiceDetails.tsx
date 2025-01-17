import { useState } from "react";
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
import Container from "@/components/ui/Container";
import { useGetSingleServiceQuery } from "@/redux/api/endpoints/serviceApi";
import { useGetAllSlotsQuery } from "@/redux/api/endpoints/slotApi";
import { useParams } from "react-router";
import { Slot } from "@/types";
import SectionTitle from "@/components/ui/SectionTitle";
import { convertTo12HourFormat } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const ServiceDetails = () => {
  const { id } = useParams();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const { data: serviceData } = useGetSingleServiceQuery({
    serviceId: id as string,
  });

  const {
    data: slotData,
    error: slotError,
    isLoading: slotLoading,
  } = useGetAllSlotsQuery({
    serviceId: id,
  });

  const service = serviceData?.data;
  const slots = slotData?.data;

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleBookNow = () => {
    // Implement booking logic here
    console.log(`Booking slot: ${selectedSlot}`);
  };

  return (
    <Container className="h-[calc(100vh-64px)] py-8 flex items-center justify-center">
      <div className="">
        <SectionTitle
          title="Book This Service Now 😊 !!"
          subtitle="Select an available time slot from below."
        />
        {slotLoading ? (
          <div className="h-96 w-full flex justify-center items-center">
            <Loader2 />
          </div>
        ) : (
          <Card className="w-full max-w-3xl mx-auto mt-6">
            <CardHeader>
              <CardTitle>{service?.name}</CardTitle>
              <CardDescription>{service?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="font-semibold">Price: ${service?.price}</p>
                <p className="font-semibold">
                  Duration: {service?.duration} minutes
                </p>
              </div>
              <h3 className="text-lg font-semibold mb-2">Available Slots:</h3>
              {slotError ? (
                <span className="text-destructive">
                  This service is not available at the moment for booking!
                </span>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {slots?.map((slot: Slot) => (
                    <Button
                      key={slot._id}
                      variant={
                        slot.isBooked === "booked" ? "secondary" : "outline"
                      }
                      disabled={slot.isBooked === "booked"}
                      onClick={() => handleSlotSelect(slot._id)}
                      className={`${
                        selectedSlot === slot._id ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      {format(new Date(slot.date), "MMM dd, yyyy")} <br />
                      {convertTo12HourFormat(slot.startTime)} -{" "}
                      {convertTo12HourFormat(slot.endTime)}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleBookNow}
                disabled={!selectedSlot}
                className="w-full"
              >
                Book Now
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default ServiceDetails;
