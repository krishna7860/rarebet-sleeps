import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { User } from '../model/user.model';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    async addUser(
        @Body('name') name: string,
        @Body('age') age: number,
        @Body('height') height: number,
        @Body('weight') weight: number,
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<{ id: string }> {

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersService.getUserByEmail(email);
        if (user) {
            throw new Error("User with email already exists");
        }

        const generatedId = await this.usersService.createUser(
            { name, age, height, weight, email, password: hashedPassword } as User
        );
        return { id: generatedId?.id as string };
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        const users = await this.usersService.getUsers();
        return users;
    }
}
