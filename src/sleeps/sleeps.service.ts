import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sleep } from 'src/model/sleeps.model';

@Injectable()
export class SleepsService {
    constructor(@InjectModel('Sleep') private readonly sleepModel: Model<Sleep>) { }

    // create a new sleep
    async createSleep(sleep: Sleep): Promise<Sleep> {
        const newSleep = new this.sleepModel(sleep);
        return await newSleep.save();
    }

    // get all sleeps for a user
    async getSleeps(userId: string): Promise<Sleep[]> {
        return await this.sleepModel.find(
            { userId: userId }
        ).exec();
    }

    // get sleep by id
    async getSleepById(sleepId: string): Promise<Sleep> {
        return await this.sleepModel.findById(sleepId).exec();
    }

    // update sleep by id
    async updateSleep(sleepId: string, sleep: Sleep): Promise<Sleep> {
        return await this.sleepModel.findByIdAndUpdate(sleepId, sleep, { new: true }).exec();
    }

    // delete sleep by id
    async deleteSleep(sleepId: string): Promise<Sleep> {
        return await this.sleepModel.findByIdAndDelete(sleepId).exec();
    }

}
