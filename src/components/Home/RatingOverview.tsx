import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

interface Review {
  id: string;
  rating: number;
  feedback: string;
  userName: string;
}

interface RatingOverviewProps {
  overallRating: number;
  recentReviews: Review[];
}

export function RatingOverview() {
  const fakeData: RatingOverviewProps = {
    overallRating: 4.3,
    recentReviews: [
      {
        id: "1",
        rating: 5,
        feedback: "Excellent service! My car looks brand new.",
        userName: "John Doe",
      },
      {
        id: "2",
        rating: 4,
        feedback: "Great experience, but the wait time could be improved.",
        userName: "Jane Smith",
      },
      {
        id: "3",
        rating: 3,
        feedback: "Average service, missed a few spots during cleaning.",
        userName: "Alex Johnson",
      },
      {
        id: "4",
        rating: 5,
        feedback: "Very professional and quick. Highly recommend!",
        userName: "Emily Davis",
      },
      {
        id: "5",
        rating: 4,
        feedback: "Good value for money, will come back again.",
        userName: "Michael Brown",
      },
    ],
  };

  const { overallRating, recentReviews } = fakeData;
  return (
    <Card className="w-full  mx-auto mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300">
          Site Rating
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center space-x-2 mb-4">
          <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            {overallRating.toFixed(1)}
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`${
                  star <= Math.round(overallRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">Recent Reviews</h3>
        {recentReviews.slice(0, 2).map((review) => (
          <div
            key={review.id}
            className="mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex items-center mb-1">
              <span className="font-medium mr-2">{review.userName}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {review.feedback}
            </p>
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="secondary"
            className=" font-bold py-2 px-4 transition-all duration-200 transform hover:scale-105 "
          >
            View All Reviews
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
