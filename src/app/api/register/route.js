import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function POST(req) {
    const { email, password } = await req.json();
    await mongoose.connect(process.env.MONGO_URI);
    if (!email || !password) {
        return Response.json({
            success: false,
            message: "Enter all feilds"
        });
    }
    if (password.length < 4) {
        return Response.json({
            success: false,
            message: "Password should have minimun 4 characters"
        });
    }
    const user = await User.findOne({ email });
    if (user) {
        return Response.json({
            success: false,
            message: "Email already exists!"
        });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ email, password: hashedPassword });
    return Response.json({
        success: true,
        message: "Registration Successful"
    });
}