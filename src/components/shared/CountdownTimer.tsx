import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string; // Must be a valid date string (e.g., "2025-01-20T13:00:00")
  className?: string;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate); // Parse targetDate
    if (isNaN(target.getTime())) {
      console.error("Invalid date format:", targetDate);
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={className}>
      {timeLeft.days > 0 && <span>{timeLeft.days} days, </span>}
      {timeLeft.hours > 0 && <span>{timeLeft.hours} hrs, </span>}
      {timeLeft.minutes > 0 && <span>{timeLeft.minutes} mins, </span>}
      <span>{timeLeft.seconds} secs</span>
    </div>
  );
}
