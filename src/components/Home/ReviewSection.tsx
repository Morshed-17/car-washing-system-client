
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { ReviewForm } from "./ReviewForm";
import { RatingOverview } from "./RatingOverview";
import useAuth from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { Lock } from "lucide-react";

const ReviewsSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate("/auth/login", {
      state: { redirect: location.pathname, sectionId: "review" },
    });
  };

  return (
    <section id="review">
      <SectionTitle
        title="Customer Reviews"
        subtitle="Customers have shared their experience"
      />
      <div className="relative">
        <AnimatePresence>
          {!user && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{
                opacity: 1,
                backdropFilter: "blur(8px)",
                transition: { duration: 0.4 },
              }}
              exit={{
                opacity: 0,
                backdropFilter: "blur(0px)",
                transition: { duration: 0.3 },
              }}
              className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10 mt-6 rounded-2xl backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{
                  scale: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  },
                }}
                className="text-center px-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="bg-white/10 p-4 rounded-full inline-block mb-4"
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-white text-xl font-semibold mb-3">
                  Login to Access Reviews
                </h3>
                <p className="text-white/80 mb-6 max-w-md">
                  Join our community to share your experience and see what
                  others are saying
                </p>
                <motion.button
                  onClick={handleLogin}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white text-black px-8 py-3 rounded-lg shadow-lg font-semibold 
                    hover:bg-opacity-90 transition-colors duration-200
                    ring-2 ring-white/20 ring-offset-2 ring-offset-transparent"
                >
                  Login Now
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mb-12 relative z-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReviewForm />
            <RatingOverview />
          </div>
        </section>
      </div>
    </section>
  );
};

export default ReviewsSection;
