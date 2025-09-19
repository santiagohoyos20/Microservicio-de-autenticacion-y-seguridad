import { Controller, Get } from '@nestjs/common';
import { AuthService } from 'src/application/services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    findAll() {
        return this.authService.findAll();
    }
}
