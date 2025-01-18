import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import SectionTitle from "../ui/SectionTitle";
import { useGetAllServicesQuery } from "@/redux/api/endpoints/serviceApi";
import ServiceCard from "../ui/ServiceCard";
import NoDataFound from "../shared/NoDataFound";
import { ServiceCardSkeleton } from "../skeletonts/service-card-skeleton";

const FeaturedServices = () => {
  // Only show first 6 active services
  const { data, error, isLoading } = useGetAllServicesQuery({});
  const services = data?.data?.data;
  const featuredServices = services
    ?.filter((service) => !service.isDeleted)
    .slice(0, 6);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Featured Services"
          subtitle="Experience our premium car care solutions"
        />
        {isLoading ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          </>
        ) : (
          <>
            {error ? (
              <div className="mt-6">
                <NoDataFound />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
              >
                {featuredServices?.map((service, index) => (
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
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="outline" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
