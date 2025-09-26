import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/types';

// FIXME: This is a mockup, replace with a real database
const users: User[] = [
  {
    userId: 1,
    email: 'alice@example.com',
    password: 'topsecret', // FIXME: Use a hash instead
  },
  {
    userId: 2,
    email: 'bob@example.com',
    password: '123abc',
  },
]

@Injectable()
export class UsersService {
    async findUserByEmail(email: string): Promise<User | undefined>{
        return users.find(user => user.email === email);
    }
}
