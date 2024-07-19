"use server";

import { Chat } from "@/lib/Chat";

export async function processChatRequest(
  status: string,
  chatRequestid: number
) {
  try {
    const chatClient = new Chat();

    chatClient.processChatRequest(status, chatRequestid);

    return {
      status: "success",
      message: "chat request is accepted",
    };
  } catch (err) {
    return {
      status: "error",
      message: "something went wrong",
    };
  }
}
