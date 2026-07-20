import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./modules/auth/auth.route";
import blogRoutes from "./modules/blog/blog.route";
import aiRoutes from "./modules/ai/ai.route";


const app = express();


app.use(
    cors({
        origin: [
            process.env.CLIENT_URL!,
            "http://localhost:3000",
        ],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes);

app.get(
    "/",
    (_, res) => {

        res.status(200).json({
            success: true,
            message: "BookVerse API Running",
        });

    }
);



app.use(
    (req, res) => {

        res.status(404).json({
            success: false,
            message: `Route ${req.originalUrl} not found`,
        });

    }
);


export default app;