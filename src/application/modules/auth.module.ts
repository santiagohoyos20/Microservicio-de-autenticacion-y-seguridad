import { Module } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { AuthController } from '../../application/controllers/auth.controller';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategiy';
// import { JWT_SECRET } from 'src'

// FIXME: This file is for development purposes only. Do not use this in p
// FIXME: Replace this with a proper configuration management system.

export const JWT_SECRET =
  "if-at-first-you-don't-succeed-dust-yourself-off-and-try-again";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
})
export class AuthModule {}
