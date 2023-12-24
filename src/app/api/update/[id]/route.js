import { Note } from "@/models/Note";
import mongoose from "mongoose";

export async function PUT(req, { params }) {
    const _id = params.id;
    const { title, content } = await req.json();
    const updated = { title, content };
    await mongoose.connect(process.env.MONGO_URI);
    const updatedNote = await Note.findOneAndUpdate({ _id }, { ...updated }, { new: true });
    return Response.json({
        success: true,
        message: "Note Updated",
        updatedNote
    });
}