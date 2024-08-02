import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // create a new user 
    async createUser(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    // get all users in typescript
    async getUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    // get user by email
    async getUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email }).exec();
    }
}
