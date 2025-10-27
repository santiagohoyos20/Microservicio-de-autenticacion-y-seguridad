import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../infrastructure/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/domain/dto/create-user.dto';

type AuthInput = { email: string; password: string };
type SignInData = { userId: string; email: string; id_rol: number };
type AuthResult = { accessToken: string; userId: string; email: string };

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) { }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.findUserByEmail(input.email);
        if (!user) return null;

        const isMatch = await bcrypt.compare(input.password, user.hash_password);
        if (user && isMatch) {
            return {
                userId: user.id_usuario,
                email: user.email,
                id_rol: user.id_rol,
            };
        }

        return null;
    }


    async signIn(user: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub: user.userId,
            email: user.email,
            id_rol: user.id_rol,
        }
        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            accessToken,
            userId: user.userId,
            email: user.email,
        }
    }

    async signUp(inputUser: CreateUserDto): Promise<any> {
        const existingUser = await this.usersService.findUserByEmail(inputUser.email);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const saltRounds = 10;
        inputUser.password = await bcrypt.hash(inputUser.password, saltRounds);
        const newUser = await this.usersService.createUser(inputUser);
        return newUser;
    }
}
