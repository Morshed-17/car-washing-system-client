import { useGetAllServicesQuery } from "@/redux/api/endpoints/serviceApi";

import SectionTitle from "@/components/ui/SectionTitle";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import { motion } from "framer-motion";
import { ServiceCardSkeleton } from "@/components/skeletonts/service-card-skeleton";
import { useState } from "react";
import SearchSortFilter from "@/components/shared/SearchSortFilter";
import NoDataFound from "@/components/shared/NoDataFound";
import { PaginationComponent } from "@/components/shared/PaginationComponent";

export default function Services() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetAllServicesQuery({
    searchTerm: debouncedSearchTerm,
    sort,
    page: page,
    limit: 9,
  });

  const services = data?.data?.data;
  const totalPages = data?.data?.meta.totalPage as number;

  //* fetch services

  return (
    <section className="my-12">
      <Container>
        <SectionTitle title="Car Wash Services" subtitle="Book Now !!" />

        <div className="mt-6">
          <SearchSortFilter
            debouncedSearchTerm={debouncedSearchTerm}
            setDebouncedSearchTerm={setDebouncedSearchTerm}
            sort={sort}
            setSort={setSort}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="mt-6">
            <NoDataFound />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          >
            {services?.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {
          !error && <div className="mt-6">
          <PaginationComponent
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
        }
        
      </Container>
    </section>
  );
}
