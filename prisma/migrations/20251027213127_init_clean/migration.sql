-- CreateTable
CREATE TABLE "public"."roles" (
    "id_rol" INTEGER NOT NULL,
    "nombre_rol" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "public"."users_auth" (
    "id_usuario" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "hash_password" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "id_rol" INTEGER NOT NULL,

    CONSTRAINT "users_auth_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_nombre_rol_key" ON "public"."roles"("nombre_rol");

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_email_key" ON "public"."users_auth"("email");

-- AddForeignKey
ALTER TABLE "public"."users_auth" ADD CONSTRAINT "users_auth_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "public"."roles"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;
