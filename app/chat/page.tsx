

import ShowChatMessages from "@/components/ShowChatMessages";
import ChatComponent from "@/components/chatComponent";
import { auth } from "@/auth";
import { Users } from "@/lib/Users";
import SideBar from "@/components/SideBar/SideBar";

import { Chat } from "@/lib/Chat";
import { Separator } from "@/components/ui/separator";
import ChatRequests from "@/components/ChatRequests";
import ChatAppBar from "@/components/ChatAppBar";

export default async function ChatPage() {
  const session = await auth();
  const chatClient = new Chat();

  const userClient = new Users(session?.user.userId || "");
 const allFriends = await userClient.getAllFriends();

  const chatRequests = await chatClient.getChatRequests(
    session?.user.userId || ""
  );
  console.log(chatRequests);
  return (
    <main className="flex flex-col min-h-screen relative ">
     <ChatAppBar chatRequests={chatRequests} />
      <div className=" flex flex-1   ">
        <SideBar allFriends={allFriends} session={session} />
        <div className=" flex-1 py-4  relative ">
          <ShowChatMessages session={session} />
          <ChatComponent session={session} />
        </div>
      </div>
    </main>
  );
}
