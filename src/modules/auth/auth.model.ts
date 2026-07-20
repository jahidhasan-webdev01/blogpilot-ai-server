import { Schema, model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    photoURL?: string;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        photoURL: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const User = model<IUser>("User", userSchema);