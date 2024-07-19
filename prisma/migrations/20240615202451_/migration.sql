-- DropIndex
DROP INDEX "Message_messageId_key";

-- AlterTable
ALTER TABLE "Message" ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId");
