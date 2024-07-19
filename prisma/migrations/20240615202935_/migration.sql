/*
  Warnings:

  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `messageId` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "messageId",
ADD COLUMN     "messageId" SERIAL NOT NULL,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId");
