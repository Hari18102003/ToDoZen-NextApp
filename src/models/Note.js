import mongoose, { models } from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Note = models?.Note || mongoose.model("Note", noteSchema);
