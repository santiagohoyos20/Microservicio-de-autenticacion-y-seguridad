import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../infrastructure/prisma.service';

type AuthInput = { email: string; password: string };
type SignInData = { userId: number; email: string };
type AuthResult = { accessToken: string; userId: number; email: string };

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ){}

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.findUserByEmail(input.email);

        if (user && user.password === input.password){
            return {
                userId: user.userId,
                email: user.email
            };
        }
        return null;
    }

    async signIn(user: SignInData): Promise<AuthResult>{
        const tokenPayload = {
            sub: user.userId,
            email: user.email,
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            accessToken,
            email: user.email,
            userId: user.userId
        }
    }

    async prueba(){
        console.log("prueba: ", await this.prisma.users_auth.findMany());
    }

}
