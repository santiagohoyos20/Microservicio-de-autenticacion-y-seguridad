import { Module } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { AuthController } from '../../application/controllers/auth.controller';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt'
// import { JWT_SECRET } from 'src'

// FIXME: This file is for development purposes only. Do not use this in p
// FIXME: Replace this with a proper configuration management system.

export const JWT_SECRET =
  "if-at-first-you-don't-succeed-dust-yourself-off-and-try-again";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
