import SectionTitle from "../ui/SectionTitle";
import { ReviewForm } from "./ReviewForm";
import { RatingOverview } from "./RatingOverview";
import useAuth from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const ReviewsSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = () => {
    navigate("/auth/login", {
      state: { redirect: location.pathname },
      
    });
  };

  return (
    <div>
      <SectionTitle
        title="Customer Reviews"
        subtitle="Customers have shared their experience"
      />
      <div className="relative">
        {!user && (
          <div className="absolute inset-0 bg-black bg-opacity-85 flex items-center justify-center z-10 mt-6">
            <button
              onClick={handleLogin}
              className="bg-white text-black px-6 py-2 rounded-md shadow-lg font-semibold hover:bg-gray-200"
            >
              Login to View Reviews
            </button>
          </div>
        )}

        <section className="mb-12 relative z-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReviewForm />
            <RatingOverview />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReviewsSection;
