import { Note } from "@/models/Note";
import mongoose from "mongoose";

export async function GET(req, { params }) {
    await mongoose.connect(process.env.MONGO_URI);
    const _id = params.id;
    const note = await Note.findOne({ _id });
    return Response.json({
        success: true,
        note
    });
}