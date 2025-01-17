import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";


export const ServiceCardSkeleton = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-6" />
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <Skeleton className="h-4 w-full mb-4" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};
