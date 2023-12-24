import { Note } from "@/models/Note";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req, { params }) {
    const session = await getServerSession(authOptions);
    const _id = params.id;
    await mongoose.connect(process.env.MONGO_URI);
    await Note.findOneAndDelete({ _id });
    await User.findOneAndUpdate({ email: session?.user.email }, { $pull: { notes: _id } }, { new: true });
    return Response.json({
        success: true,
        message: "Deletion Success"
    });
}