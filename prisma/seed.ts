import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { nombre_rol: 'admin' },
    { nombre_rol: 'driver' },
    { nombre_rol: 'user' },
  ];

  for (const role of roles) {
    await prisma.roles.upsert({
      where: { nombre_rol: role.nombre_rol },
      update: {},
      create: role,
    });
  }
}

main()
  .then(() => {
    console.log('Roles insertados correctamente');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
