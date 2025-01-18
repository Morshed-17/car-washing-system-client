import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Service } from "@/types";
import { Clock, Sparkles } from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router";
import { Button } from "./button";

const ServiceCard = ({ _id, duration, name, price, description }: Service) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow flex flex-col ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{name}</h3>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span>{duration} minutes</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaBangladeshiTakaSign  className="w-4 h-4 text-primary" />
            <span>{price}Tk</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" asChild>
          <Link to={`/services/${_id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
