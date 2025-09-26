/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users_auth` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."users_auth" ALTER COLUMN "id_usuario" SET DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_email_key" ON "public"."users_auth"("email");
