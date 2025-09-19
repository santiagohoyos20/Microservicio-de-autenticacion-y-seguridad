import { Controller, Get } from '@nestjs/common';
import { AuthService } from 'src/application/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    findAll() {
        return this.authService.findAll();
    }
}
