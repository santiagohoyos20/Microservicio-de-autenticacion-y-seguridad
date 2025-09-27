import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { PassportLocalGuard } from '../guards/passport-local.guard';
import { PassportJwtAuthGuard } from '../guards/passport-jwt.guard';
import { CreateUserDto } from 'src/domain/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Request() request) {
        console.log(request.user);
        return this.authService.signIn(request.user)
    }

    @UseGuards(PassportJwtAuthGuard)
    @Get('me')
    getUserInfo(@Request() request: any) {
        return request.user;
    }

    @HttpCode(HttpStatus.CREATED) // 201 → recurso creado
    @Post('signup')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }
}
