"use client";

import UserPreviewSideBar from "./UserPreviewSideBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "@/store/ChatSlice";
import { BASE_URL } from "@/config/config";
import type { Session } from "next-auth";
import ChatRequestModal from "../chatRequest/ChatRequestModal";
import { addFriends } from "@/store/FriendsSlice";
import { RootState } from "@/store/store";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleSideBar } from "@/store/ChatBarSlice";
import { Skeleton } from "../ui/skeleton";

export default function SideBar({
  allFriends,
  session,
}: {
  allFriends: {
    name: string | null;
    id: string;
    email: string;
    image: string | null;
  }[];
  session: Session | null;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const friends = useSelector((state: RootState) => state.friends.friends);
  const isSideBarOpen = useSelector(
    (state: RootState) => state.chatAppBar.isSideBarOpen
  );

  useEffect(() => {
    const fetchAllFriendsMessages = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/messages`, {
        method: "GET",
        cache:"no-cache"
      });

      let messages = await response.json();

      messages = messages.data.map((msgObj: any) => ({
        message: msgObj.message,
        recepientId: msgObj.recepientId,
        senderId: msgObj.senderId,
        timeDate: msgObj.timeDate,
      }));

      dispatch(addMessages(messages));
      setIsLoading(false);
    };

    fetchAllFriendsMessages();
  }, [dispatch]);

  useEffect(() => {
    dispatch(addFriends(allFriends));
  }, [allFriends, dispatch]);

  if (isLoading) {
    return (
      <div className="border-r-[1px] px-4 py-12 flex flex-col gap-4">
        <Skeleton className="w-[360px] h-[60px] rounded-lg" />
        <Skeleton className="w-[360px] h-[60px] rounded-lg" />
        <Skeleton className="w-[360px] h-[60px] rounded-lg" />
        <Skeleton className="w-[360px] h-[60px] rounded-lg" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        " lg:min-w-[400px] max-w-[600px]  bg-background py-12 max-lg:py-6 border-r-[1px] space-y-8 max-lg:absolute max-lg:z-[99] h-full top-0 left-0 max-lg:transition-all max-lg:duration-500",
        {
          " max-lg:-translate-x-full": isSideBarOpen === false,
          "max-lg:translate-x-0": isSideBarOpen === true,
        }
      )}
    >
      <div className=" flex justify-end lg:hidden">
        <Button size="icon" variant="ghost"  onClick={()=>{dispatch(toggleSideBar())}}>
          <CircleX className="text-primary" />
        </Button>
      </div>
      <ChatRequestModal />
      <div className=" space-y-2">
        {friends.map((friend) => (
          <UserPreviewSideBar key={friend.id} user={friend} session={session} />
        ))}
      </div>
    </div>
  );
}
