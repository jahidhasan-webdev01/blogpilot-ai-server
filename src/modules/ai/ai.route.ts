import { Router } from "express";
import * as AIController from "./ai.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
    "/generate-blog",
    auth,
    AIController.generateBlog
);

router.post(
    "/chat",
    AIController.chat
);

export default router;