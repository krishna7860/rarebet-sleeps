import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SleepsModule } from './sleeps/sleeps.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kqfrqij.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`),
    UsersModule,
    AuthModule,
    SleepsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }

