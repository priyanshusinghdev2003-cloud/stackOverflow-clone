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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6),
});

function Register() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function onSubmit(values) {
    setIsLoading(true);
    const response = await createAccount({
      name: `${values.firstName} ${values.lastName}`,
      email: String(values.email),
      password: String(values.password),
    });

    if (response.error) {
      toast.error(
        typeof response.error === "string"
          ? response.error
          : response.error?.message || "Something went wrong",
      );
    }
    if (response.success) {
      toast.success("Account created successfully");
      router.push("/login");
    }
    setIsLoading(false);
  }
  return (
    <div className="auth-card">
      <h2 className="text-center text-2xl font-bold">Register</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4">
            <CustomFormField
              name="firstName"
              control={form.control}
              label="First Name"
              placeholder="Enter your first name"
              type="text"
            />
            <CustomFormField
              name="lastName"
              control={form.control}
              label="Last Name"
              placeholder="Enter your last name"
              type="text"
            />
          </div>
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
          <Button
            type="submit"
            className={"btn-primary w-full"}
            disabled={isLoading}
          >
            Register
          </Button>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default Register;
