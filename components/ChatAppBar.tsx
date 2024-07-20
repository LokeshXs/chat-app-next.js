"use client";

import ChatRequests from "./ChatRequests";
import { Button } from "./ui/button";
import { PanelLeftOpen } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "@/store/ChatBarSlice";
import { LogOut } from 'lucide-react'
import { signOut } from "next-auth/react";

export default function ChatAppBar({
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
  const dispatch = useDispatch();

  return (
    <div className="py-4 px-12 max-md:px-4 flex items-center justify-between border-b-[1px] rounded-b-3xl">
      <div>
        <Button
          size="icon"
          variant="ghost"
          className=" lg:hidden "
          onClick={() => {
            dispatch(toggleSideBar());
          }}
        >
          <PanelLeftOpen className=" text-primary" />
        </Button>
      </div>
      <div className=" flex items-center gap-4">
        <span className="">
          <Button className=" flex gap-2 items-center" onClick={()=>signOut()}>
            <p>Log out</p>
            <LogOut />
          </Button>
        </span>
        <ChatRequests chatRequests={chatRequests} />
      </div>
    </div>
  );
}
