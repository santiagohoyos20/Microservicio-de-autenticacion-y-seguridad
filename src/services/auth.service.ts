import { ConflictException, Inject, Injectable, InternalServerErrorException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../infrastructure/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/domain/dto/create-user.dto';
import type { ClientGrpc } from '@nestjs/microservices';

type AuthInput = { email: string; password: string };
type SignInData = { userId: string; email: string; id_rol: number };
type AuthResult = { accessToken: string; userId: string; email: string };
import { IUserService } from '../domain/interfaces/user-grpc.interfaces';
import { firstValueFrom } from 'rxjs';
import { IDriverService } from 'src/domain/interfaces/driver-grpc.interfaces';
import { IsPhoneNumber } from 'class-validator';

@Injectable()
export class AuthService implements OnModuleInit {
    private userGrpc: IUserService;
    private driverGrpc: IDriverService;
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
        @Inject('USERS_PACKAGE') private readonly userClient: ClientGrpc,
        @Inject('DRIVERS_PACKAGE') private driverClient: ClientGrpc,
    ) { }
    onModuleInit() {
        this.userGrpc = this.userClient.getService<IUserService>('UsersService');
        this.driverGrpc = this.driverClient.getService<IDriverService>('DriversService');
    }

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
        // console.log('telefono:', inputUser.phone_number);

        if (inputUser.id_rol == 2) {
            try {
                console.log(inputUser.phoneNumber);
                const response = await firstValueFrom(
                    this.driverGrpc.createDriver({
                        uuid: newUser.id_usuario,
                        email: newUser.email,
                        name: inputUser.name,
                        lastname: inputUser.lastname,
                        phoneNumber: inputUser.phoneNumber,
                        rol: inputUser.id_rol,
                    }),
                );
                return response;
            } catch (error) {
                console.error('Error gRPC createDriver:', error);
                throw new InternalServerErrorException('Error interno al registrar driver');
            }
        }
        const response = await firstValueFrom(
            this.userGrpc.createUser({
                uuid: newUser.id_usuario,
                email: newUser.email,
                name: inputUser.name,
                lastname: inputUser.lastname,
                phoneNumber: inputUser.phoneNumber,
            }),
        );
        return response;
    }
}