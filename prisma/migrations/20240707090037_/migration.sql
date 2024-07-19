-- CreateTable
CREATE TABLE "ChatRequests" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "from_id" TEXT NOT NULL,
    "to_id" TEXT NOT NULL,

    CONSTRAINT "ChatRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatRequests" ADD CONSTRAINT "ChatRequests_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
