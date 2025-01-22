import { DialogFooter } from "@/components/ui/dialog";
import { AddServiceSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/endpoints/serviceApi";
import { toast } from "sonner";
import { ApiError } from "@/types";
import { useEffect, useState } from "react";
import { uploadToCloudinary, validateImage } from "@/lib/utils";

interface UpdateServiceFormProps {
  onClose: () => void;
  _id: string;
}

export default function UpdateServiceForm({
  onClose,
  _id,
}: UpdateServiceFormProps) {
  const { data } = useGetSingleServiceQuery({ serviceId: _id });
  const [updateService] = useUpdateServiceMutation();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof AddServiceSchema>>({
    resolver: zodResolver(AddServiceSchema.partial()),
    defaultValues: {
      name: "",
      description: "",
      duration: 0,
      price: 0,
      image: "",
    },
  });

  // Reset form when data changes
  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name || "",
        description: data.data.description || "",
        duration: data.data.duration || 0,
        price: data.data.price || 0,
        image: data.data.image || "",
      });
    }
  }, [data, form]);

  // Submit handler
  async function onSubmit(values: z.infer<typeof AddServiceSchema>) {
    try {
      const result = await updateService({
        updatedService: values,
        serviceId: _id,
      }).unwrap();
      toast.success(result.message);
      onClose();
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Service Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    const errorMessage = validateImage(file);
                    if (errorMessage) {
                      toast.error(errorMessage);
                      return;
                    }
                    setIsUploading(true);
                    try {
                      const imageUrl = await uploadToCloudinary(file);
                      form.setValue("image", imageUrl);
                      toast.success("Image uploaded successfully!");
                    } catch (error) {
                      toast.error("Failed to upload image");
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                />
              </FormControl>
              {field.value && (
                <img
                  src={field.value}
                  alt="Service"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
              {isUploading && <p>Uploading...</p>}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Service Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input placeholder="Basic Car Wash" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Description</FormLabel>
              <FormControl>
                <Input placeholder="Window cleaning, tires wash" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Duration In Minutes</FormLabel>
              <FormControl>
                <Input placeholder="60" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="40" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <DialogFooter>
          <Button type="submit" disabled={isUploading}>
            Update
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
