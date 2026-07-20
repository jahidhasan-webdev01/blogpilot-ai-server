import { Request, Response } from "express";
import { loginOrCreateUser } from "./auth.service";
import { createToken } from "../../utils/createToken";

export const socialLogin = async (req: Request, res: Response) => {
    try {
        const user = await loginOrCreateUser(req.body);

        const token = createToken({
            email: user.email,
            name: user.name,
        });

        res.status(200).json({
            success: true,
            token,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};