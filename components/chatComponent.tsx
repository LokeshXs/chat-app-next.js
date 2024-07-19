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

export default function ChatComponent({
  session,
}: {
  session: Session | null;
}) {
  // const session = useSession();
  if (!session) {
    throw new Error("Cannot verify the logged in user");
  }
  const user = session.user;
  console.log(session);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const recepientId = useSelector(
    (state: RootState) => state.chatObject.recepientId
  );
  const dispatch = useDispatch();

  //for making sure that useeffect run once
  const effectCalled = useRef<boolean>(false);
  const form = useForm<z.infer<typeof chatInputFormSchema>>({
    resolver: zodResolver(chatInputFormSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    const userid = user?.userId;

    const newSocket = new WebSocket(`${WebSocketServerUrl}?id=${userid}`);

    newSocket.onopen = () => {
      console.log("connection is established");
    };

    newSocket.onmessage = (data: MessageEvent<string>) => {
      const parsedData: ChatMessage = JSON.parse(data.data);
      console.log(`Message received: ${parsedData.message}`);

      // if (parsedData.error) {
      //   console.error(parsedData.error);
      //   return;
      // }

      dispatch(addMessage(parsedData));
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user?.userId, dispatch]);

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
    <div className=" absolute bottom-6 w-full">
      <PlaceholdersAndVanishInput placeholders={placeholders} session={session} />
      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendMessage)}
          className="max-w-[60%] max-xl:max-w-[90%] max-md:max-w-full px-4 w-full mx-auto flex gap-2 items-center "
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className=" flex-1 w-full">
                <FormControl>
                  <Input placeholder="Type a message ..." className=" text-lg h-10" {...field} />
                 
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            variant="ghost" 
            size="icon"
            type="submit"
            className=" bg-primary rounded-full w-12 h-12 hover:bg-primary"
          >
            <SendHorizontal className=" text-primary-foreground" />
          </Button>
        </form>
      </Form> */}
    </div>
  );
}
