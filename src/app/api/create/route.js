import { Note } from "@/models/Note";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function POST(req) {

    const session = await getServerSession(authOptions);
    const userEmail = session?.user.email;
    const { title, content } = await req.json();
    await mongoose.connect(process.env.MONGO_URI);
    if (!title || !content) {
        return Response.json({
            success: false,
            message: "Both Title and Content is required"
        });
    }
    const note = await Note.create({ title, content });
    await User.findOneAndUpdate({ email: userEmail }, { $push: { notes: note._id } });
    return Response.json({
        success: true,
        message: "Created Successfully"
    });

}