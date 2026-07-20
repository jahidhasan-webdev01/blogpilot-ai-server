import { Router } from "express";
import * as BlogController from "./blog.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth, BlogController.createBlog);

router.get("/", BlogController.getAllBlogs);

router.get("/:id", BlogController.getSingleBlog);

router.patch("/:id", auth, BlogController.updateBlog);

router.delete("/:id", auth, BlogController.deleteBlog);

export default router;