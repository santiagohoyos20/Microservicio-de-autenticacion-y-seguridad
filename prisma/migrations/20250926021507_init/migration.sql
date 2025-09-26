-- CreateTable
CREATE TABLE "public"."users_auth" (
    "id_usuario" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "hash_password" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "users_auth_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id_rol" UUID NOT NULL,
    "nombre_rol" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "public"."user_roles" (
    "id_usuario" UUID NOT NULL,
    "id_rol" UUID NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id_usuario","id_rol")
);

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."users_auth"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "public"."roles"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;
