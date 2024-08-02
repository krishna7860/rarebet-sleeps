import { Module } from '@nestjs/common';
import { SleepsController } from './sleeps.controller';
import { SleepsService } from './sleeps.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SleepSchema } from 'src/model/sleeps.model';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: 'Sleep', schema: SleepSchema }]),
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [SleepsController],
  providers: [SleepsService]
})

export class SleepsModule { }
