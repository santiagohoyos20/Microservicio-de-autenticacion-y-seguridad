import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/types';

// FIXME: This is a mockup, replace with a real database
const users: User[] = [
  {
    userId: 1,
    username: 'Alice',
    password: 'topsecret', // FIXME: Use a hash instead
  },
  {
    userId: 2,
    username: 'Bob',
    password: '123abc',
  },
]

@Injectable()
export class UsersService {
    async findUserByName(username: string): Promise<User | undefined>{
        return users.find(user => user.username === username);
    }
}
