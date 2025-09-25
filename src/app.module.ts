import { Module } from '@nestjs/common';
import { AuthModule } from './application/modules/auth.module';
import { UsersModule } from './application/modules/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
