import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { username: string; password: string };
type SignInData = { userId: number; username: string };
type AuthResult = { accessToken: string; userId: number; username: string };

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.findUserByName(input.username);

        if (user && user.password === input.password){
            return {
                userId: user.userId,
                username: user.username
            };
        }
        return null;
    }

    async signIn(user: SignInData): Promise<AuthResult>{
        const tokenPayload = {
            sub: user.userId,
            username: user.username,
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            accessToken,
            username: user.username,
            userId: user.userId
        }
    }

}
