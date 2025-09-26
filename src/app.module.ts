import { Module } from '@nestjs/common';
import { AuthModule } from './application/modules/auth.module';
import { UsersModule } from './application/modules/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // hace que ConfigService esté disponible en toda la app
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
