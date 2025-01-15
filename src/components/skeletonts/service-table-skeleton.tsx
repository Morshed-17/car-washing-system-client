import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function ServiceTableSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <TableRow key={i}>
          <TableCell className="w-[200px]">
            <Skeleton className="h-4 " />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-10 w-10 rounded-md" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-10 w-10 rounded-md ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
