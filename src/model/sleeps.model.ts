import * as mongoose from "mongoose"

export const SleepSchema = new mongoose.Schema({
    date: String,
    startTime: String,
    wakeUpTime: String,
    totalDuration: Number,
    userId: String,
});


export interface Sleep extends mongoose.Document {
    date: string,
    startTime: string,
    wakeUpTime: string,
    totalDuration: number,
    userId: string,
}
