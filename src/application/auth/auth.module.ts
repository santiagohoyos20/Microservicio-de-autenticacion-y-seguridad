import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '../../interface/auth/auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
