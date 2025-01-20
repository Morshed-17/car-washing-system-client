import { AddServiceModal } from "@/components/dashboard/ManageService/AddServiceModal";
import { DeleteServiceModal } from "@/components/dashboard/ManageService/DeleteServiceModal";
import { UpdateServiceModal } from "@/components/dashboard/ManageService/UpdateServiceModal";
import { ServiceTableSkeleton } from "@/components/skeletonts/service-table-skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useState } from "react";

export function ManageServices() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllServicesQuery({ page, limit });
  const services = data?.data?.data;
  const meta = data?.data?.meta;

  const totalPages = meta?.total ? Math.ceil(meta.total / limit) : 0;

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              <Pagination className="justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePrevious();
                      }}
                      className={`${
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }`}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((pageNum) => {
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= page - 1 && pageNum <= page + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(pageNum);
                            }}
                            isActive={page === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    if (
                      (pageNum === 2 && page > 3) ||
                      (pageNum === totalPages - 1 && page < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNext();
                      }}
                      className={`${
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
