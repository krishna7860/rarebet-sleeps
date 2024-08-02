import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/model/user.model';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>): Promise<{ access_token: string }> {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }


    @Get('profile')
    getProfile(@Request() req): User {
        return req.user;
    }
}