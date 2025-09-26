import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dto/create-user.dto';
import { User } from 'src/domain/entities/types';
import { PrismaService } from 'src/infrastructure/prisma.service';

// FIXME: This is a mockup, replace with a real database
// const users: User[] = [
//   {
//     userId: 1,
//     email: 'alice@example.com',
//     password: 'topsecret', // FIXME: Use a hash instead
//   },
//   {
//     userId: 2,
//     email: 'bob@example.com',
//     password: '123abc',
//   },
// ]

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  
  async findUserByEmail(email: string): Promise<any> {
    return this.prisma.users_auth.findUnique({
      where: { email },
    });
  }

  async createUser(user: CreateUserDto): Promise<any> {

    await this.prisma.users_auth.create({
      data: {
        email: user.email,
        hash_password: user.password,
        estado: 'activo',
      },
    });
    return {
      email: user.email,
      hash_password: user.password,
      estado: 'activo',
    };
  }
}
