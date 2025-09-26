import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../infrastructure/prisma.service';
import * as bcrypt from 'bcrypt';

type AuthInput = { email: string; password: string };
type SignInData = { userId: string; email: string };
type AuthResult = { accessToken: string; userId: string; email: string };

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ){}

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.findUserByEmail(input.email);
        const isMatch = await bcrypt.compare(input.password, user.hash_password);
        if (user && isMatch){
            return {
                userId: user.id_usuario,
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
        console.log(user);
        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            accessToken,
            email: user.email,
            userId: user.userId
        }
    }

    async signUp(input: AuthInput): Promise<any>{
        const existingUser = await this.usersService.findUserByEmail(input.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const saltRounds = 10;
        input.password = await bcrypt.hash(input.password, saltRounds);
        const newUser = await this.usersService.createUser(input);
        return newUser;
    }
}
