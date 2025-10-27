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
        estado: true,
        id_rol: true,
      },
    });

    if (!user) return null;

    return {
      id_usuario: user.id_usuario,
      email: user.email,
      hash_password: user.hash_password,
      estado: user.estado,
      id_rol: user.id_rol,
    };
  }

  async createUser(user: CreateUserDto): Promise<any> {
    const roleId = user.rol ?? 3; // Asigna 3 si no se proporciona rol

    const newUser = await this.prisma.users_auth.create({
      data: {
        email: user.email,
        hash_password: user.password,
        estado: 'activo',
        rol: { connect: { id_rol: roleId } },
      },
      select: {
        id_usuario: true,
        email: true,
        estado: true,
        id_rol: true,
      },
    });

    return newUser;
  }
}
