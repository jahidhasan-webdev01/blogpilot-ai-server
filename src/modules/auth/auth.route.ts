import { Router } from "express";
import { socialLogin } from "./auth.controller";

const router = Router();

router.post("/social-login", socialLogin);

export default router;