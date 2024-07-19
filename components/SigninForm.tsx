"use client";

import { signInSchema } from "@/lib/zod";
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
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

export function SignInForm({
  action,
}: {
  action: (values: z.infer<typeof signInSchema>) => Promise<
    | {
        status: string;
        message: string;
      }
    | undefined
  >;
}) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setErrorMessage("");
    setSuccessMessage("");
    startTransition(() => {
      action(values).then((res) => {
        if (!res) {
          return;
        }
        if (res.status === "error") {
          setErrorMessage(res.message);
        }
        if (res.status === "success") {
          setSuccessMessage(res.message);
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
            No account?{" "}
            <Link href="/signup" className=" text-primary font-medium">
              Sign up
            </Link>
          </p>
          <Button type="submit" disabled={isPending}>
            Sign in
          </Button>
        </div>

        <div
          className={cn("p-2 rounded text-primary-foreground text-center", {
            "bg-destructive": errorMessage,
            "bg-green-600": successMessage,
          })}
        >
          {successMessage === "" ? errorMessage : successMessage}
        </div>
      </form>
    </Form>
  );
}
