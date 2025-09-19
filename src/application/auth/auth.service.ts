import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async findAll() {
        return `This action returns all`;
    }
}
