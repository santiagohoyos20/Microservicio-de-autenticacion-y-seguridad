import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { id_rol: 1, nombre_rol: 'admin' },
    { id_rol: 2, nombre_rol: 'driver' },
    { id_rol: 3, nombre_rol: 'user' },
  ];

  for (const role of roles) {
    await prisma.roles.upsert({
      where: { nombre_rol: role.nombre_rol },
      update: {},
      create: role,
    });
  }

  console.log('Roles insertados correctamente');
}

main()
  .catch((e) => {
    console.error('Error insertando roles:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });