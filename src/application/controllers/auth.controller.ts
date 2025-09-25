import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/application/guards/auth.guard';
import { AuthService } from 'src/services/auth.service';
import { PassportLocalGuard } from '../guards/passport-local.guard';
import { PassportJwtAuthGuard } from '../guards/passport-jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Request() request){
        return this.authService.signIn(request.user)
    }

    @UseGuards(PassportJwtAuthGuard)
    @Get('me')
    getUserInfo(@Request() request: any){
        return request.user;
    }
}
