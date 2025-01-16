import React, { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import { ReviewForm } from "./ReviewForm";
import { RatingOverview } from "./RatingOverview";

const ReviewsSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Update based on actual auth state

  const handleLogin = () => {
    // Simulate login (replace with real login logic)
    setIsLoggedIn(true);
  };

  return (
    <div>
      <SectionTitle
        title="Customer Reviews"
        subtitle="Customers have shared their experience"
      />
      <div className="relative">
        {!isLoggedIn && (
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
