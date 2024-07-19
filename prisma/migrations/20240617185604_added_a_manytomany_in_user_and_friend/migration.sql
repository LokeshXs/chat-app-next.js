-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friendId_fkey";

-- DropIndex
DROP INDEX "Friend_friendId_key";

-- AlterTable
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_pkey" PRIMARY KEY ("friendId");

-- CreateTable
CREATE TABLE "UserFriend" (
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "UserFriend_pkey" PRIMARY KEY ("userId","friendId")
);

-- AddForeignKey
ALTER TABLE "UserFriend" ADD CONSTRAINT "UserFriend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFriend" ADD CONSTRAINT "UserFriend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friend"("friendId") ON DELETE RESTRICT ON UPDATE CASCADE;
