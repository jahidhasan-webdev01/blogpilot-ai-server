import { Blog } from "./blog.model";

export const createBlog = async (payload: any) => {
    return await Blog.create(payload);
};

export const getAllBlogs = async (query: any) => {
    const {
        search = "",
        category,
        sort = "desc",
        page = "1",
        limit = "8",
    } = query;

    const filter: Record<string, any> = {};

    if (search) {
        filter.title = {
            $regex: search,
            $options: "i",
        };
    }

    if (category) {
        filter.category = category;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Blog.countDocuments(filter);

    const blogs = await Blog.find(filter)
        .sort({
            createdAt: sort === "asc" ? 1 : -1,
        })
        .skip(skip)
        .limit(Number(limit));

    return {
        blogs,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
    };
};

export const getSingleBlog = async (id: string) => {
    return await Blog.findById(id);
};

export const deleteBlog = async (id: string) => {
    return await Blog.findByIdAndDelete(id);
};

export const updateBlog = async (
    id: string,
    payload: any
) => {
    return await Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};