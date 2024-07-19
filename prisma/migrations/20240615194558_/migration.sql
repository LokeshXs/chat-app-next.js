-- CreateTable
CREATE TABLE "Message" (
    "messageId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "recepientId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "timeDate" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_messageId_key" ON "Message"("messageId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recepientId_fkey" FOREIGN KEY ("recepientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
