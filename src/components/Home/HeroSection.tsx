import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight, Sparkles, Clock, Shield, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import bannerImg from '../../assets/banner.webp';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants for water drops
//   const dropVariants = {
//     initial: { y: -20, opacity: 0 },
//     animate: { y: 0, opacity: 1 },
//   };

  // Stagger effect for features
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
            }}
            animate={{
              y: ["0%", "1000%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter text-foreground">
                Transform Your Car's
                <span className="block text-primary">Appearance Today</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-muted-foreground"
            >
              Experience the ultimate car care revolution with our cutting-edge
              technology and passionate experts.
            </motion.p>

            {/* Animated Feature List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-4 py-6 "
            >
              {[
                { icon: Sparkles, text: "Premium Detail" },
                { icon: Clock, text: "Express Service" },
                { icon: Shield, text: "Satisfaction Guaranteed" },
                { icon: Droplets, text: "Eco-Friendly" },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={itemVariants}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-primary/5 transition-colors "
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-sm">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link to="/services" className="flex items-center">
                  Book Now
                  <motion.div
                    animate={{ x: isHovered ? 10 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/services" className="flex items-center">
                  View Services
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="ml-2"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Animated Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"
              animate={{
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <img
              src={bannerImg}
              alt="Luxury car being detailed"
              className="w-full h-full object-cover"
            />

            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
              style={{
                width: "50%",
                skewX: -20,
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
