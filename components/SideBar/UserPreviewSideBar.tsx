"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setRecepient } from "@/store/ChatSlice";
import { cn, localeTimeFormatter } from "@/lib/utils";
import { User } from "@/@types/types";
import type { Session } from "next-auth";
import { toggleSideBar } from "@/store/ChatBarSlice";

export default function UserPreviewSideBar({
  user,
  session,
}: {
  user: {
    name: string | null;
    id: string;
    email: string;
    image: string | null;
  };
  session: Session | null;
}) {
  const dispatch = useDispatch();
  const recepientId = useSelector(
    (state: RootState) => state.chatObject.recepientId
  );
  const chatMessages = useSelector(
    (state: RootState) => state.chatObject.chatMessages
  );

  if (!session) {
    throw new Error("Cannot verify the logged in user");
  }
  const loggedInUser = session.user;

  const getLastChatmessage = chatMessages
    .filter(
      (message) =>
        (message.senderId === user.id &&
          message.recepientId === loggedInUser?.userId) ||
        (message.senderId === loggedInUser?.userId &&
          message.recepientId === user.id)
    )
    .slice(-1);

  const lastMessageDate = getLastChatmessage[0]?.timeDate
    ? localeTimeFormatter(getLastChatmessage[0]?.timeDate)
    : "";

  return (
    <div
      className={cn(
        " flex items-center py-4 px-6 hover:cursor-pointer hover:bg-muted",
        {
          "bg-muted": recepientId === user.id,
        }
      )}
      onClick={() => {
        dispatch(setRecepient(user.id));
        dispatch(toggleSideBar())
      }}
    >
      <Avatar className=" w-12 h-12">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <span className=" flex-1 px-4 space-y-1">
        <p className=" text-lg font-medium">{user.name}</p>
        <p className=" text-sm text-muted-foreground">
          {getLastChatmessage[0]?.message || ""}
        </p>
      </span>

      <span className=" flex flex-col items-end">
        <p className=" text-xs text-muted-foreground">{lastMessageDate}</p>
        {/* <p>2</p> */}
      </span>
    </div>
  );
}
