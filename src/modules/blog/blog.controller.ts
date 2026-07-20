import { Request, Response } from "express";
import * as BlogService from "./blog.service";

export const createBlog = async (req: Request, res: Response) => {
    try {
        const blog = await BlogService.createBlog(req.body);

        res.status(201).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create blog",
        });
    }
};

export const getAllBlogs = async (req: Request, res: Response) => {
    const blogs = await BlogService.getAllBlogs();

    res.json({
        success: true,
        data: blogs,
    });
};

export const getSingleBlog = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const blog = await BlogService.getSingleBlog(id);

    res.json({
        success: true,
        data: blog,
    });
};

export const deleteBlog = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await BlogService.deleteBlog(id);

    res.json({
        success: true,
        message: "Blog deleted successfully",
    });
};