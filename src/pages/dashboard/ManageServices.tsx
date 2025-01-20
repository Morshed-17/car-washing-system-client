import { AddServiceModal } from "@/components/dashboard/ManageService/AddServiceModal";
import { DeleteServiceModal } from "@/components/dashboard/ManageService/DeleteServiceModal";
import { UpdateServiceModal } from "@/components/dashboard/ManageService/UpdateServiceModal";

import { ServiceTableSkeleton } from "@/components/skeletonts/service-table-skeleton";
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

export function ManageServices() {
  const { data, isLoading } = useGetAllServicesQuery({});
  const services = data?.data?.data;

  return (
    <div>
      <div>
      <h1 className="text-xl font-bold mb-4">Service Management</h1>

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
            <TableHead className="w-[200px]">Price</TableHead>
            <TableHead className="w-[200px]">Duration</TableHead>
            <TableHead className="w-[100px]">Edit</TableHead>
            <TableHead className="text-right w-[100px]">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <ServiceTableSkeleton />
          ) : (
            <>
              {services?.map((service) => (
                <TableRow key={service?._id}>
                  <TableCell className="font-medium">{service?.name}</TableCell>
                  <TableCell>{service?.description}</TableCell>
                  <TableCell>{service?.price}Tk</TableCell>
                  <TableCell className="">{service?.duration} Min</TableCell>
                  <TableCell className="">
                    <UpdateServiceModal _id={service?._id} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteServiceModal serviceId={service?._id} />
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
