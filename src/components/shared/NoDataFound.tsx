import { FileQuestion } from "lucide-react";
import { Card } from "@/components/ui/card";

const NoDataFound = () => {
  return (
    <Card className="w-full p-12 flex flex-col items-center justify-center text-center space-y-4 bg-muted/50">
      <FileQuestion className="w-12 h-12 text-muted-foreground" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">No Results Found</h3>
        <p className="text-sm text-muted-foreground max-w-[250px]">
          No matching items were found. Try adjusting your filters or search terms.
        </p>
      </div>
    </Card>
  );
};

export default NoDataFound;