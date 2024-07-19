-- AddForeignKey
ALTER TABLE "ChatRequests" ADD CONSTRAINT "ChatRequests_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
