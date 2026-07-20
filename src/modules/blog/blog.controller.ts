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
    try {
        console.log(req.query);
        const result = await BlogService.getAllBlogs(req.query);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch blogs",
        });
    }
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

export const updateBlog = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.params.id as string;

        const result = await BlogService.updateBlog(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Failed to update blog",
        });
    }
};

export const getAllCategories = async (req: Request,
    res: Response) => {
    try {
        const categories = await BlogService.getAllCategories();

        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: categories,
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const getMyBlogs = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const result = await BlogService.getMyBlogs(userEmail, req.query);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user blogs",
    });
  }
};