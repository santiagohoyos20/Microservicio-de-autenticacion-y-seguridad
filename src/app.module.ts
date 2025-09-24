import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/modules/auth.module';
import { UsersModule } from './infrastructure/modules/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
