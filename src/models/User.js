import mongoose, { models } from "mongoose";
import { Note } from "./Note";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

export const User = models?.User || mongoose.model("User", userSchema);