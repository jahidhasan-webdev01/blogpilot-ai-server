import { Request, Response } from "express";
import * as AIService from "./ai.service";

export const generateBlog = async (
    req: Request,
    res: Response
) => {
    try {
        const result = await AIService.generateBlog(req.body);

        res.json({
            success: true,
            data: result,
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "AI generation failed",
        });
    }
};

export const chat = async (
    req: Request,
    res: Response
) => {
    try {
        const result = await AIService.chatWithAI(req.body);

        res.json({
            success: true,
            data: result,
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "AI chat failed",
        });
    }
};