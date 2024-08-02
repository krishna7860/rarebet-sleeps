import { Body, Controller, Inject, Injectable, Post, Put, Scope, Get, Delete } from '@nestjs/common';
import { SleepsService } from './sleeps.service';
import { Sleep } from 'src/model/sleeps.model';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
@Controller('sleeps')
export class SleepsController {

    constructor(private sleepsService: SleepsService, @Inject(REQUEST) private readonly request: Request) { }

    @Post("/")
    async addSleep(
        @Body('date') date: string,
        @Body('startTime') startTime: string,
        @Body('wakeUpTime') wakeUpTime: string,
    ): Promise<{ id: string }> {
        const totalDuration: number = (new Date(wakeUpTime).getTime() - new Date(startTime).getTime()) / 1000;
        const userId: string = this.request['user'].id;

        const generatedId = await this.sleepsService.createSleep(
            { date, startTime, wakeUpTime, totalDuration, userId } as Sleep
        );
        return { id: generatedId?.id as string };
    }


    @Put("/")
    async updateSleep(
        @Body('id') id: string,
        @Body('date') date: string,
        @Body('startTime') startTime: string,
        @Body('wakeUpTime') wakeUpTime: string,
    ): Promise<{ id: string }> {
        const totalDuration: number = new Date(startTime).getTime() - new Date(wakeUpTime).getTime();
        const userId: string = this.request['user'].id;

        const generatedId = await this.sleepsService.updateSleep(
            id,
            { date, startTime, wakeUpTime, totalDuration, userId } as Sleep
        );
        return { id: generatedId?.id as string };
    }


    @Get("/")
    async getSleeps(): Promise<{
        date: string,
        startTime: string,
        wakeUpTime: string,
        totalDuration: number,
        duration: { hours: number, minutes: number, seconds: number }
    }[]> {
        const userId: string = this.request['user'].id;
        const sleeps = await this.sleepsService.getSleeps(userId);
        const response = [];

        sleeps.forEach(sleep => {
            const hours = Math.floor(sleep.totalDuration / 3600);
            const minutes = Math.floor((sleep.totalDuration % 3600) / 60);
            const seconds = sleep.totalDuration % 60;
            response.push({
                id: sleep.id,
                date: sleep.date,
                startTime: sleep.startTime,
                wakeUpTime: sleep.wakeUpTime,
                totalDuration: sleep.totalDuration,
                duration: { hours, minutes, seconds }
            });
        });

        return response;
    }

    @Delete("/")
    async deleteSleep(
        @Body('id') id: string,
    ): Promise<{ id: string }> {
        const userId: string = this.request['user'].id;
        const generatedId = await this.sleepsService.deleteSleep(id);
        return { id: generatedId?.id as string };
    }


    @Get(':id')
    async getSleepById(
        @Body('id') id: string,
    ): Promise<Sleep> {
        const sleep = await this.sleepsService.getSleepById(id);
        return sleep;
    }


    @Get('weekly')
    async getAverageSleepDuration() {
        const userId: string = this.request['user'].id;
        const sleeps = await this.sleepsService.getSleeps(userId);

        // filter sleeps for the last 7 days
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        const filteredSleeps = sleeps.filter(sleep => new Date(sleep.date) > last7Days);

        const averageSleepDuration = filteredSleeps.reduce((acc, sleep) => acc + sleep.totalDuration, 0) / filteredSleeps.length;
        const averageStartTime = filteredSleeps.reduce((acc, sleep) => acc + new Date(sleep.startTime).getTime(), 0) / filteredSleeps.length;
        const averageWakeTime = filteredSleeps.reduce((acc, sleep) => acc + new Date(sleep.wakeUpTime).getTime(), 0) / filteredSleeps.length;

        return {
            averageSleepDuration,
            averageStartTime,
            averageWakeTime
        };
    }
}
