"use server";
import { z } from "zod";
import { signInSchema, signUpSchema } from "@/lib/zod";
import { signIn } from "@/auth";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const signInAction = async (values: z.infer<typeof signInSchema>) => {
  try {
    const validate = signInSchema.safeParse(values);

    if (!validate.success) {
      return {
        status: "error",
        message: "Invalid values provided!",
      };
    }

    const { email, password } = validate.data;

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    console.log(error);

    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return {
            status: "error",
            message: "User does not exist!",
          };

        case "CredentialsSignin":
          return {
            status: "error",
            message: "Password is incorrect or User not exist",
          };

        case "OAuthAccountNotLinked":
          return {
            status: "error",
            message: "Account is already exists with the email",
          };

        default:
          return {
            status: "error",
            message: "Something went wrong!",
          };
      }
    }

    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
};

export const signUpAction = async (values: z.infer<typeof signUpSchema>) => {
  try {
    const validate = signUpSchema.safeParse(values);

    if (!validate.success) {
      return {
        status: "error",
        message: "Invalid values provided!",
      };
    }

    const { email, password, name } = validate.data;

    //   Check if a user already exists

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return {
        status: "error",
        message: "User already exists!",
      };
    }

    // hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user

    await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return {
      status: "success",
      message: "Signed up successfully!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
};
