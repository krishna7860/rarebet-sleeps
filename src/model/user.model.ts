import * as mongoose from "mongoose"

export const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    height: Number,
    weight: Number,
    email: String,
    password: String,
});


export interface User extends mongoose.Document {
    id: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    email: string;
    password: string;
}
