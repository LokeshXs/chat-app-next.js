"use client";
import { SendHorizontal } from "lucide-react";
import { useEffect, useState, useContext, useRef } from "react";
import type { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { ChatMessage } from "@/store/ChatSlice";
import { UserInfoContext } from "@/context/UserInfoContextProvider";
import type { Session } from "next-auth";
import { WebSocketServerUrl } from "@/config/config";
import { addMessage, setRecepient } from "@/store/ChatSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { chatInputFormSchema } from "@/lib/zod";
import { useSession } from "next-auth/react";
import { PlaceholdersAndVanishInput } from "./VanishInput";
import useWebSocket from "@/hooks/useWebSocket";
import { Send } from "lucide-react";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function ChatComponent({
  session,
}: {
  session: Session | null;
}) {
  if (!session) {
    throw new Error("Cannot verify the logged in user");
  }

  const user = session.user;

  const { socket } = useWebSocket(user.userId);

  const recepientId = useSelector(
    (state: RootState) => state.chatObject.recepientId
  );

  const dispatch = useDispatch();

  function sendMessage(values: z.infer<typeof chatInputFormSchema>) {
    console.log(user);
    if (!user) {
      throw new Error("Cannot verify the logged in user");
    }
    const messageTime = new Date();
    const messageObj = {
      recepientId: recepientId,
      message: values.message,
      senderId: user?.userId,
      timeDate: messageTime.toISOString(),
    };

    socket?.send(JSON.stringify(messageObj));

    dispatch(addMessage(messageObj));
  }

  const placeholders = [
    "Did you watch the latest episode of Stranger Things?",
    "Hey, are you free this weekend?",
    "How about that new Italian place downtown?",
    "Thinking of going to the beach. Want to join?",
    "Sounds perfect. What time?",
  ];

  if (recepientId === "") return;

  return (
    <div className=" absolute bottom-2 max-sm:bottom-1 w-full">
      {socket ? (
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          session={session}
        />
      ) : (
        <div className="flex flex-col items-center gap-2 justify-center bg-muted py-2 rounded-lg text-destructive dark:text-red-400 max-md:px-2 text-center max-md:text-sm">
          <p>Sorry, but we are not able to make connection to our server</p>
          <Link href="https://x.com/singh_loke28577" target="_blank">
          <Button asChild>
            <span className=" flex items-center gap-2">
              <p>DM to Lokesh now</p>
              <FaSquareXTwitter className=" w-6 h-6" />
            </span>
          </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
