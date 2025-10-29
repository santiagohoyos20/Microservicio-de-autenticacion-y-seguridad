// src/grpc/grpc.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_PACKAGE', // nombre con el que lo inyectarás
        transport: Transport.GRPC,
        options: {
          package: 'users', // debe coincidir con el "package" del .proto
          protoPath: join(process.cwd(), 'src/application/modules/users.proto'), // ruta al archivo .proto
          url: 'localhost:50051', // dirección del microservicio users
        },
      },
      // Cliente para DRIVERS
      {
        name: 'DRIVERS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'drivers', // debe coincidir con el "package" del .proto
          protoPath: join(process.cwd(), 'src/application/modules/drivers.proto'),
          url: 'localhost:50052', // dirección del microservicio drivers
        },
      },
    ]),
  ],
  exports: [ClientsModule], // importante: exportar para que otros módulos lo usen
})
export class GrpcModule { }
