"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { processChatRequest } from "@/actions/processChatRequest";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addFriend } from "@/store/FriendsSlice";

export default function ChatRequests({
  chatRequests,
}: {
  chatRequests: {
    id: number;
    status: string;
    from_id: string;
    to_id: string;
    fromUser: {
      name: string | null;
      email: string;
      image: string | null;
    };
  }[];
}) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const [chatRequestsState, setChatRequestsState] = useState<
    {
      id: number;
      status: string;
      from_id: string;
      to_id: string;
      fromUser: {
        name: string | null;
        email: string;
        image: string | null;
      };
    }[]
  >(chatRequests);

  const acceptChatRequest = async (
    status: string,
    id: number,
    user: {
      name: string | null;
      id: string;
      email: string;
      image: string | null;
    }
  ) => {
    startTransition(() => {
      processChatRequest(status, id).then((res) => {
        if (res.status === "success") {
          setChatRequestsState((prevState) =>
            prevState.filter((request) => request.id !== id)
          );
          dispatch(addFriend(user));
        }
        if (res.status === "error") {
          toast.error(res.message);
        }
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" relative w-5 h-5" type="button">
        <Bell />
        <p className=" absolute -top-2 -right-1 bg-primary text-xs w-4 h-4 rounded-full text-primary-foreground">
          {chatRequestsState.length}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px]">
        {chatRequestsState.length === 0 && (
          <DropdownMenuItem className=" flex flex-col items-center gap-4 ">
            <Image
              src="/sad.svg"
              alt="No notifications"
              width={140}
              height={140}
            />
            <p className=" text-center text-lg text-muted-foreground">
              No notifications
            </p>
          </DropdownMenuItem>
        )}

        {chatRequestsState.map((obj) => {
          return (
            <DropdownMenuItem
              className=" w-full flex gap-12 items-center justify-between"
              key={obj.id}
            >
              <div>
                <p>{obj.fromUser.name}</p>
                <p>{obj.fromUser.email}</p>
              </div>

              <div>
                <Button
                  onClick={() => {
                    acceptChatRequest("Accept", obj.id, {
                      name: obj.fromUser.name,
                      id: obj.from_id,
                      email: obj.fromUser.email,
                      image: obj.fromUser.image,
                    });
                  }}
                  disabled={isPending}
                >
                  Accept
                </Button>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
