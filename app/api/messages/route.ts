import { auth } from "@/auth";
import db from "@/lib/db";
import { date } from "zod";

export async function GET() {
  try {
    const session = await auth();
    // console.log(session);
    // Fetch messages where sender is user or receiver is user
    const messages = await db.message.findMany({
      where: {
        OR: [
          {
            senderId: session?.user.userId,
          },
          {
            recepientId: session?.user.userId,
          },
        ],
      },
    });

    return Response.json({
      status: "success",
      data: messages,
    });
  } catch (err) {
    return Response.json({
      status: "error",
      error: err,
    });
  }
}
