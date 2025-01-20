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

const ServiceCard = ({
  _id,
  duration,
  name,
  price,
  description,
  image,
}: Service) => {
  return (
    <Card className="group relative h-full border-none bg-background/50 backdrop-blur-sm hover:bg-background/60 transition-all duration-300">
      <div className="absolute inset-0 border border-primary/10 rounded-lg"></div>

      <div className="flex flex-row gap-4 p-4">
        {/* Image Container */}
        <div className="w-1/3 shrink-0">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={image || "/placeholder.svg"}
              alt={name}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          </div>
        </div>

        {/* Content Container */}
        <div className="flex w-2/3 flex-col z-50">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold tracking-tight line-clamp-1">
                {name}
              </h3>
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {description}
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs">{duration}m</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
                <FaBangladeshiTakaSign className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs">{price}Tk</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-4">
            <Button
              variant="outline"
              className="w-full border-primary/20 hover:bg-primary/10 z-50"
              asChild
            >
              <Link to={`/services/${_id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
