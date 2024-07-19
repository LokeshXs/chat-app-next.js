"use server";

import { z } from "zod";
import { searchUserSchema } from "@/lib/zod";
import db from "@/lib/db";
import { auth } from "@/auth";

export async function sendChatRequest(
  values: z.infer<typeof searchUserSchema>
) {
  try {
    const session = await auth();
    console.log(session);
    const validate = searchUserSchema.safeParse(values);

    if (!validate.success) {
      throw new Error("Invalid fields");
    }

    const { email, id } = validate.data;


    const chatRequest = await db.chatRequests.findFirst({
        where:{
            to_id:id,
            from_id:session?.user.userId
        }
    });

    if(chatRequest){
        throw new Error("Request already sent!")
    }

    await db.chatRequests.create({
      data: {
        status: "Pending",
        from_id: session?.user.userId || "",
        to_id: id || "",
      },
    });

    return {
        status:"success",
        message:"Chat Request sent"
    }
  } catch (err:any) {

    return {
        status:"error",
        message: err.message || "Cannot send the request, try again!"
    }
  }
}
