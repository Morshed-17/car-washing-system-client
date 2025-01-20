import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Users,
  Car,
  Shield,
  Award,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const About = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: MapPin, value: "15+", label: "Locations" },
    { icon: Car, value: "50,000+", label: "Cars Cleaned" },
    { icon: Clock, value: "5+", label: "Years Experience" },
  ];

  const services = [
    {
      title: "Premium Hand Wash",
      description:
        "Expert detailing with premium products for a showroom finish.",
      icon: ChevronRight,
    },
    {
      title: "Interior Detailing",
      description: "Deep cleaning of all interior surfaces and upholstery.",
      icon: Sparkles,
    },
    {
      title: "Express Wash",
      description: "Quick but thorough cleaning for busy professionals.",
      icon: Clock,
    },
    {
      title: "Paint Protection",
      description: "Advanced coating to protect your cars paint job.",
      icon: Shield,
    },
  ];

  return (
    <Container className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-background to-background dark:from-blue-950"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-20 relative"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent dark:from-blue-500/10"></div>
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold pb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-transparent bg-clip-text"
        >
          CarWash Bangladesh
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
        >
          Transforming vehicles into masterpieces since 2019
        </motion.p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <Card className="h-full bg-card/80 backdrop-blur-xl border-blue-200/20 dark:border-blue-900/30 shadow-lg hover:shadow-blue-500/10">
              <CardContent className="p-6">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-10 h-10 mx-auto mb-4 text-blue-500" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-20"
      >
        <Card className="bg-card/80 backdrop-blur-xl border-blue-200/20 dark:border-blue-900/30 overflow-hidden">
          <CardContent className="p-8 relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent dark:from-blue-500/5"></div>
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              >
                <Shield className="w-16 h-16 mx-auto mb-6 text-blue-500" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                Our Mission
              </h2>
              <p className="text-xl leading-relaxed text-muted-foreground">
                To revolutionize the car care industry in Bangladesh by
                providing world-class services with eco-friendly solutions. We
                believe in treating every car as if it were our own, ensuring
                the highest standards of cleanliness and care.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid md:grid-cols-2 gap-8 mb-20"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="h-full bg-card/80 backdrop-blur-xl border-blue-200/20 dark:border-blue-900/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <CardContent className="p-8 flex items-start space-x-4">
                <service.icon className="w-8 h-8 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mb-20"
      >
        <Card className="bg-card/80 backdrop-blur-xl border-blue-200/20 dark:border-blue-900/30">
          <CardContent className="p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
            >
              <Award className="w-16 h-16 mx-auto mb-6 text-blue-500" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Why Choose CarWash?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Team",
                  description:
                    "Highly trained professionals with years of experience in premium car care",
                },
                {
                  title: "Quality Products",
                  description:
                    "Using only premium, eco-friendly cleaning solutions for superior results",
                },
                {
                  title: "Convenience",
                  description:
                    "Multiple locations across Bangladesh with flexible scheduling options",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="p-6 rounded-xl bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mb-20"
      >
        <Card className="bg-card/80 backdrop-blur-xl border-blue-200/20 dark:border-blue-900/30">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Visit Us Today
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-lg mb-8">
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 mb-4 text-blue-500" />
                <p className="text-muted-foreground">
                  123 Gulshan Avenue, Dhaka
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 mb-4 text-blue-500" />
                <p className="text-muted-foreground">
                  Open 7 Days a Week: 8 AM - 8 PM
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 mb-4 text-blue-500" />
                <p className="text-muted-foreground">
                  Contact: +880 1234-567890
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Book an Appointment
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default About;
