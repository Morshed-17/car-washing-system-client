import { Button } from "@/components/ui/button";

import { useGetAllServicesQuery } from "@/redux/api/endpoints/serviceApi";

import SectionTitle from "@/components/ui/SectionTitle";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import { motion } from "framer-motion";
import { ServiceCardSkeleton } from "@/components/skeletonts/service-card-skeleton";
import { useState } from "react";
import SearchSortFilter from "@/components/shared/SearchSortFilter";

export default function Services() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    sort: "",
    priceRange: [0, 10000],
  });
  const { data, isLoading } = useGetAllServicesQuery(filters);
  const services = data?.data?.data;

  //* fetch services

  return (
    <section className="mt-12">
      <Container>
        <SectionTitle title="Car Wash Services" subtitle="Book Now !!" />

        <SearchSortFilter />
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
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
        <Button asChild></Button>
      </Container>
    </section>
  );
}
