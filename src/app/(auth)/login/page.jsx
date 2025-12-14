"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/Auth";
import { useState } from "react";
import CustomFormField from "@/components/FormField";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function Login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(values) {
    setIsLoading(true);
    const response = login(values);
    if (response.error) {
      toast.error(
        typeof response.error === "string"
          ? response.error
          : response.error?.message || "Something went wrong",
      );
    }
    if (response.success) {
      toast.success("Login successful");
      router.push("/");
    }
    setIsLoading(false);
  }
  return (
    <div className="auth-card">
      <h2 className="text-center text-2xl font-bold">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomFormField
            name="email"
            control={form.control}
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <CustomFormField
            name="password"
            control={form.control}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <Button type="submit" className={"btn-primary w-full"}>
            Login
          </Button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default Login;
