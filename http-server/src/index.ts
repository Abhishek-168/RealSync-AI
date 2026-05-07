import express from "express";
import cors from "cors";
// import jwt from "jsonwebtoken";
import { googleAuthSchema, signupSchema } from "./schemas/auth.schema";

const app = express();
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(express.json());

app.post("/auth/signup", (req, res) => {
    const userData = req.body;
    const validateData = signupSchema.safeParse(userData);

    if (!validateData.success) {
        res.status(400).json({ error: validateData.error });
        return;
    }


    // db query to create user with validateData.data
    // jwt sign with user id and send back to client in HttpOnly cookie

    res.status(200).json({ message: "Signup endpoint" });
});

app.post("/auth/google", (req, res) => {

    const { credential } = req.body;
    const validateData = googleAuthSchema.safeParse({ credential });
    if (!validateData.success) {
        res.status(400).json({ error: validateData.error });
        return;
    }
    // db query to find or create user with validateData.data.credential
    // jwt sign with user id and send back to client in HttpOnly cookie
    res.status(200).json({ message: "Google auth endpoint" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});