"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
  rating: z.number().min(1, { message: "Please select at least one star" }),
  feedback: z
    .string()
    .min(4, { message: "Feedback must be at least 4 characters" }),
});

export function ReviewForm() {
  const { user } = useAuth();
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      feedback: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
        name: user?.name,
        email: user?.email,
        ...values
    });
    // Handle form submission here
  }

  return (
    <Card className="w-full mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-purple-700 dark:text-purple-300">
          Share Your Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-medium text-center block">
                    How would you rate your experience?
                  </FormLabel>
                  <FormControl>
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => field.onChange(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                        >
                          <Star
                            size={32}
                            className={`${
                              star <= (hoveredRating || field.value)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            } transition-colors duration-200`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">
                    Your Feedback
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience..."
                      className="h-28 resize-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 transition-all duration-200 transform hover:scale-105"
              >
                Submit Review
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
