import db from "./db";

export class Chat {
  //   private userId: string;

  //   constructor(userId: string) {
  //     this.userId = userId;
  //   }

  public async getChats(userId: string) {
    const chats = await db.message.findMany({
      where: {
        senderId: userId,
        recepientId: userId,
      },
    });

    return chats;
  }

  public async getChatRequests(userId: string) {
    const chatRequests = await db.chatRequests.findMany({
      where: {
        to_id: userId,
        status: "Pending",
      },

      select: {
        fromUser: {
          select: {
            name: true,
            email: true,
            image:true
          },
        },
        from_id: true,
        to_id: true,
        id: true,
        status: true,
      },
    });

    return chatRequests;
  }

  public async processChatRequest(status: string, chatRequestid: number) {
    const chat = await db.chatRequests.update({
      where: {
        id: chatRequestid,
      },
      data: {
        status,
      },
    });

    await db.friends.create({
      data: {
        user_id: chat.to_id,
        friend_id: chat.from_id,
      },
    });


    await db.friends.create({
      data:{
        user_id:chat.from_id,
        friend_id:chat.to_id
      }
    })
  }
}
