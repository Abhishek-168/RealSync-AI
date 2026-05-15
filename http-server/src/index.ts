import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { googleAuthSchema, signupSchema } from "./schemas/auth.schema";
import dotenv from "dotenv";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
});
    
dotenv.config();
const app = express();


const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_key";

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(express.json());

app.post("/auth/signup", async (req, res) => {
    const userData = req.body;
    const validateData = signupSchema.safeParse(userData);

    if (!validateData.success) {
        res.status(400).json({ error: validateData.error });
        return;
    }


    // db query to create user with validateData.data

    const user = await prisma.user.create({
        data: {
            username: validateData.data.username,
            email: validateData.data.email,
            password: await bcrypt.hash(validateData.data.password, 10), 
        },
    });

    // jwt sign with user id and send back to client in HttpOnly cookie

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

    res.status(200).json({ message: "Signup endpoint" });
});

app.post("/auth/google", async (req, res) => {

    const { credential } = req.body;
    const validateData = googleAuthSchema.safeParse({ credential });
    if (!validateData.success) {
        res.status(400).json({ error: validateData.error });
        return;
    }
    // db query to find or create user with validateData.data.credential
    const decoded: any = jwt.decode(validateData.data.credential);
    if (!decoded || !decoded.sub || !decoded.email || !decoded.name) {
        res.status(400).json({ error: "Invalid Google credential" });
        return;
    }

    let user = await prisma.user.findFirst({
        where: { email: decoded.email },
    });

    // If user doesn't exist, creating a new one
    if (!user) {
        user = await prisma.user.create({
            data: {
                username: decoded.name,
                email: decoded.email,
                googleId: decoded.sub,
                ProviderGoogle: true,
            },
        });
    }

    // jwt sign with user id and send back to client in HttpOnly cookie
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

    res.status(200).json({ message: "Google auth endpoint" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});