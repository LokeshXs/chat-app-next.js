"use client";

import { useContext, useEffect, useState } from "react";
import type { Session } from "next-auth";
import type { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { cn, localeTimeFormatter } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function ShowChatMessages({
  session,
}: {
  session: Session | null;
}) {
  if (!session) {
    throw new Error("Cannot verify the logged in user");
  }
  const user = session.user;
  const chatMessages = useSelector(
    (state: RootState) => state.chatObject.chatMessages
  );

  
  const selectedRecepientId = useSelector(
    (state: RootState) => state.chatObject.recepientId
  );

  // useEffect(()=>{

  //   const fetchMessages = async()=>{
  //     if (!user?.userId) {
  //       throw new Error("Cannot verify the logged in user");
  //     }
  //     const messages = await db.message.findMany({
  //       where:{
  //         senderId:selectedRecepientId,
  //         recepientId:user?.userId
  //       }
  //     })

  //   }

  //   fetchMessages();
  // },[]);

  const chatMessagesForSelectedUser = chatMessages.filter(
    (message) =>
      (message.senderId === selectedRecepientId &&
        message.recepientId === user?.userId) ||
      (message.senderId === user?.userId &&
        message.recepientId === selectedRecepientId)
  );

  if (selectedRecepientId === "") {
    return (
      <div className=" h-full pb-20 ">
        <div className="h-full rounded-2xl  space-y-2 relative  ">
          <div className=" absolute min-h-full bottom-0 right-0 w-full flex items-center justify-center  ">
            <p>Select a contact to start chatting</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-full pb-20">
      <div className="h-full rounded-2xl bg-gray-50/40  space-y-2 relative   ">
        <div className=" absolute max-h-full bottom-0 right-0 w-[100%] flex flex-col gap-8 py-4 px-32 max-sm:px-4  overflow-y-auto left-1/2 -translate-x-1/2">
          {chatMessagesForSelectedUser.map((message, index) => {
            return (
              <span key={index}  className={cn("flex flex-col gap-2", {
                "self-start  items-start ": message.recepientId === user.userId,
                "self-end items-end ":
                  message.recepientId !== user?.userId,
              })}>
                <p
                 className={cn("rounded-xl p-2 w-fit", {
                  "bg-muted ": message.recepientId === user.userId,
                  "bg-primary text-primary-foreground":
                    message.recepientId !== user?.userId,
                })}
                >
                  {message.message}
                </p>
                <p className=" text-xs text-muted-foreground">{localeTimeFormatter(message.timeDate)}</p>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
