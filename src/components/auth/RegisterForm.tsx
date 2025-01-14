import { RegisterSchema } from "@/schema/index.ts";
import CardWrapper from "./CardWrapper";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/api/endpoints/authApi";
import { Loader2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: 0,
      address: "",
    },
  });

  const onSubmit = async () => {
    const formData = form.getValues();
    const { name, email, password, confirmPassword, phone, address } = formData;
    if (confirmPassword !== password)
      return form.setError("confirmPassword", {
        type: "match",
        message: "Passwords doesn't match",
      });
    try {
      //* register the user

      await register({
        name,
        email,
        address,
        phone: phone.toString(),
        password,
      }).unwrap();

      //* login the user
      // Call login API after registration
      const loginResult = await login({ email, password }).unwrap();

      //* Dispatch user data and token
      if (loginResult.success && loginResult.token) {
        dispatch(setUser({ user: loginResult.data, token: loginResult.token }));
        toast.success("Account Created Succesfully")
        navigate("/");
      }
    } catch (err: any) {
      form.setError("root", {
        type: "server",
        message: err?.data?.message,
      });
    }
  };
  return (
    <CardWrapper
      label="Create an account"
      title="Register"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an acount? login here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <p className="text-center text-destructive">
              {form.formState.errors["root"]?.message &&
                "Registration Failed. Please try again with differnt gmail"}
            </p>
            <div className="flex gap-4 flex-col md:flex-row">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="john" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="example@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="16/A Dhaka" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full">
            {isLoading ? (
              <Loader2 className="rotate-180"></Loader2>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
