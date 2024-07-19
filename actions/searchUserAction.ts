"use server";

import { z } from "zod";
import { searchUserSchema } from "@/lib/zod";
import db from "@/lib/db";
import { auth } from "@/auth";

export async function searchUserAction(value: z.infer<typeof searchUserSchema>) {


  try {

    const session = await auth();
    console.log(session);

    const parsedValue = searchUserSchema.safeParse(value);

    if (!parsedValue.success) {
      return {
        status: "error",
        message: "Please input more than 3 characters",
      };
    }

    const users = await db.user.findMany({
      where: {
        email: {
          contains: parsedValue.data.email,
          mode: "insensitive",
          not:session?.user.email || ""
        },
      },
      take: 10,
      select: {
        name: true,
        email: true,
        id:true
      },
    });

    return {
      status: "success",
      data: users,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}
