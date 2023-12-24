import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function GET(req) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email }).populate("notes");
    const notes = user?.notes;
    return Response.json({
        success: true,
        notes,
        noteLength: notes?.length
    });
}