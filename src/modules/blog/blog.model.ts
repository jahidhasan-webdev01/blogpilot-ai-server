import { Schema, model } from "mongoose";

export interface IBlog {
    title: string;
    shortDescription: string;
    content: string;
    category: string;
    image?: string;
    authorEmail: string;
}

const blogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        shortDescription: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        authorEmail: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Blog = model<IBlog>("Blog", blogSchema);