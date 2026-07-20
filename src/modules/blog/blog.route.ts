import { Router } from "express";
import * as BlogController from "./blog.controller";

const router = Router();

router.post("/", BlogController.createBlog);

router.get("/", BlogController.getAllBlogs);

router.get("/:id", BlogController.getSingleBlog);

router.delete("/:id", BlogController.deleteBlog);

export default router;