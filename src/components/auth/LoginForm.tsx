import { LoginSchema } from "@/schema/index.ts";
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
import { useLoginMutation } from "@/redux/api/endpoints/authApi";
import { ApiError } from "@/types";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";
import { toast } from "sonner";

interface RedirectState {
  redirect?: string;
  sectionId?: string;
  fromComponent?: string;
  from: string;
}

export function LoginForm({ redirect }: { redirect: RedirectState }) {
  console.log(redirect);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loging, { isLoading }] = useLoginMutation();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSuccessFullLogin = (redirectData: RedirectState) => {
    navigate(redirectData?.redirect || redirect?.from || "/");

    if (redirectData?.sectionId) {
      requestAnimationFrame(() => {
        const element = document.getElementById(redirectData.sectionId!);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    }
  };

  const onSubmit = async () => {
    const formData = form.getValues();
    const { email, password } = formData;
    try {
      const result = await loging({ email, password }).unwrap();

      if (result.success && result.token) {
        dispatch(setUser({ user: result.data, token: result.token }));
        toast.success("Account Logged In Succesfully");

        // handle redirect with the enhanced function
        handleSuccessFullLogin(redirect);
      }
    } catch (err: any) {
      const error = err.data as ApiError;
      form.setError("root", {
        type: "server",
        message: error?.message,
      });
      console.log(err);
    }
  };
  return (
    <CardWrapper
      label="Login to your account"
      title="login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an acount? Register here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <p className="text-center text-destructive">
              {form.formState.errors["root"]?.message}
            </p>
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
          </div>
          <Button className="w-full">
            {isLoading ? <Loader2 className="rotate-180"></Loader2> : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
