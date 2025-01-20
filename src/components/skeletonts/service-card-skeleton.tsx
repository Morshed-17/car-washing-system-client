import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ServiceCardSkeleton = () => {
  return (
    <Card className="group relative h-full border-none bg-background/50 backdrop-blur-sm">
      <div className="absolute inset-0 border border-primary/10 rounded-lg"></div>
      <div className="flex flex-row gap-4 p-4">
        {/* Image Skeleton */}
        <div className="w-1/3 shrink-0">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="flex w-2/3 flex-col z-50">
          {/* Header */}
          <div className="p-0">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-4 shrink-0" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-0">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>

          {/* Footer */}
          <div className="p-0 mt-4">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCardSkeleton;
