import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dto/create-user.dto';
import { User } from 'src/domain/entities/types';
import { PrismaService } from 'src/infrastructure/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findUserByEmail(email: string): Promise<any> {
    const user = await this.prisma.users_auth.findUnique({
      where: { email },
      select: {
        id_usuario: true,
        email: true,
        hash_password: true,
        user_roles: {
          select: {
            id_rol: true,
          },
        },
      },
    });
    if (!user) return null;

    return {
      id_usuario: user.id_usuario,
      email: user.email,
      hash_password: user.hash_password,
      roleIds: user.user_roles.map(r => r.id_rol),
    };
  }

  async createUser(user: CreateUserDto): Promise<any> {

    const newUser = await this.prisma.users_auth.create({
      data: {
        email: user.email,
        hash_password: user.password,
        estado: 'activo',
      },
    });

    await this.prisma.user_roles.create({
      data: {
        id_usuario: newUser.id_usuario,
        id_rol: user.role,
      },
    });

    return {
      email: user.email,
      estado: 'activo',
      userID: newUser.id_usuario,
      role: user.role,
    };
  }
}
