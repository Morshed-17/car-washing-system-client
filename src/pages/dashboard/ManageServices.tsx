import { AddServiceModal } from "@/components/dashboard/ManageService/AddServiceModal";
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
  const { data } = useGetAllServicesQuery(undefined);
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
                <Button size="icon" variant="destructive">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}
