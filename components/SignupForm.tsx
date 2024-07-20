"use client";

import { useState, useTransition } from "react";
import { signUpSchema } from "@/lib/zod";
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
import Link from "next/link";
import PasswordInput from "./PasswordInput";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function SignUpForm({
  action,
}: {
  action: (values: z.infer<typeof signUpSchema>) => Promise<{
    status: string;
    message: string;
  }>;
}) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setErrorMessage("");
    setSuccessMessage("");
    startTransition(() => {
      action(values).then((res) => {
        if (res.status === "error") {
          setErrorMessage(res.message);
        }
        if (res.status === "success") {
          setSuccessMessage(res.message);

          router.push("/signin")

        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" max-w-[500px] w-full space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Full Name"
                  className=" text-lg h-10"
                  disabled={isPending}
                  {...field}
                />
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
                  placeholder="Email id"
                  className=" text-lg h-10"
                  disabled={isPending}
                  {...field}
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
                <PasswordInput field={field} isPending={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex justify-between items-center pt-4">
          <p>
            Have an account?{" "}
            <Link href="/signin" className=" text-primary font-medium">
              Sign in
            </Link>
          </p>
          <Button type="submit" disabled={isPending}>Sign up</Button>
        </div>

        <div className={cn("p-2 rounded text-primary-foreground text-center",{
            "bg-destructive":errorMessage,
            "bg-green-600":successMessage
        })}>
            {successMessage === ""?errorMessage:successMessage}
        </div>
      </form>
    </Form>
  );
}
