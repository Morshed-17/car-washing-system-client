import { format, isBefore, startOfDay } from "date-fns";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Dispatch, SetStateAction } from "react";

interface DatePickerComponentProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  className?: string;
  buttonText?: string;
  disabled?: boolean;
}
const DatePickerComponent = ({
  date,
  setDate,
  className,
  buttonText = "Pick a date",
  disabled = true,
}: DatePickerComponentProps) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full col-span-3 ${className}`}
          >
            {date ? format(date, "PPP") : buttonText}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {disabled ? (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                isBefore(startOfDay(date), startOfDay(new Date()))
              }
            />
          ) : (
            <Calendar mode="single" selected={date} onSelect={setDate} />
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePickerComponent;
