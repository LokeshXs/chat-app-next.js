import db from "@/lib/db";

export class Users {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  static async getUser(email: string) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  static async getAllUsers() {
    const users = await db.user.findMany();

    return users;
  }

  public async getAllFriends() {
    const friends = await db.friends.findMany({
      where: {
        user_id: this.userId,
      },
      select: {
        friend: {
          select: {
            name: true,
            image: true,
            email: true,
            id:true
          },
        },
      },
    });

    const allFriends = friends.map((friendObj)=> {
      return {...friendObj.friend}
    })
    return allFriends;
  }
}
