import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllReviewsQuery } from "@/redux/api/endpoints/reviewApi";

const Reviews = () => {
  const { data, isLoading } = useGetAllReviewsQuery(undefined);
  const reviews = data?.data || [];
  console.log(reviews);

  // Calculate overall statistics
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
      totalReviews || 0;
  const ratingCounts = reviews.reduce((acc: any, review) => {
    acc[review?.rating] = (acc[review?.rating] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Overview Section */}
      <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300">
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`${
                      star <= Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Based on {totalReviews} reviews
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="col-span-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mb-2">
                  <div className="w-12 text-sm text-gray-600 dark:text-gray-400">
                    {rating} stars
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{
                          width: `${
                            ((ratingCounts[rating] || 0) / totalReviews) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-sm text-gray-600 dark:text-gray-400">
                    {ratingCounts[rating] || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">Loading reviews...</div>
        ) : (
          reviews.map((review) => (
            <Card key={review._id} className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {review.username}
                    </h3>
                    <div className="flex items-center">
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
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {review.feedback}
                </p>
              </CardContent>
            </Card>
          ))
        )}
        {reviews.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">No reviews yet</div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
