import { Blog } from "./blog.model";

export const createBlog = async (payload: any) => {
    return await Blog.create(payload);
};

export const getAllBlogs = async () => {
    return await Blog.find().sort({ createdAt: -1 });
};

export const getSingleBlog = async (id: string) => {
    return await Blog.findById(id);
};

export const deleteBlog = async (id: string) => {
    return await Blog.findByIdAndDelete(id);
};