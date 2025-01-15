import { AddServiceModal } from "@/components/dashboard/ManageService/AddServiceModal";
import { DeleteServiceModal } from "@/components/dashboard/ManageService/DeleteServiceModal";
import { ServiceTableSkeleton } from "@/components/skeletonts/service-table-skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllServicesQuery } from "@/redux/api/endpoints/serviceApi";
import { Edit, Trash } from "lucide-react";

export function ManageServices() {
  const { data, isLoading } = useGetAllServicesQuery(undefined);
  const services = data?.data;

  return (
    <div>
      <div>
        <AddServiceModal />
      </div>
      <Table className="mt-4">
        <TableCaption>
          {services?.length === 0
            ? "You don't have any services. Add Services!!!"
            : "A list of your Services"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="">Duration</TableHead>
            <TableHead className="">Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <ServiceTableSkeleton />
          ) : (
            <>
              {services?.map((service) => (
                <TableRow key={service._id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell className=""></TableCell>
                  <TableCell className="">
                    <Button size="icon">
                      <Edit />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteServiceModal serviceId={service._id}/>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}
