import { Module } from '@nestjs/common';
import { AuthModule } from './application/modules/auth.module';
import { UsersModule } from './application/modules/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma.module';
import { GrpcModule } from './application/modules/grpc.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // hace que ConfigService esté disponible en toda la app
    }),
    PrismaModule,
    GrpcModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
