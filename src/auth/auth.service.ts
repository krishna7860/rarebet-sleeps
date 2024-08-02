import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email);

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            throw new UnauthorizedException("Please check your login credentials");
        }

        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };

    }

}
