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
import { useEffect } from "react";

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
  const form = useForm<z.infer<typeof AddServiceSchema>>({
    resolver: zodResolver(AddServiceSchema.partial()),
    defaultValues: {
      name: "",
      duration: undefined,
      price: undefined,
      description: "",
    },
  });

  // Reset form when data changes
  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name || "",
        duration: data.data.duration || undefined,
        price: data.data.price || undefined,
        description: data.data.description || "",
      });
    }
  }, [data, form]);

  async function onSubmit(values: z.infer<typeof AddServiceSchema>) {
    console.log(values);
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

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Duration In Minutes</FormLabel>
              <FormControl>
                <Input placeholder="Basic Car Wash" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <DialogFooter>
          <Button type="submit">Update</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
