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

interface AddServiceFormProps {
    onClose: () => void;
  }

export default function AddServiceForm({onClose}: AddServiceFormProps) {
  const form = useForm<z.infer<typeof AddServiceSchema>>({
    resolver: zodResolver(AddServiceSchema),
    defaultValues: {
      name: "",
      duration: 0,
      price: 0,
      description: "",
      isDeleted: false,
    },
  });

  function onSubmit(values: z.infer<typeof AddServiceSchema>) {
    console.log(values);
    onClose()
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
          <Button type="submit">Publish</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
