import { User } from "@/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                await mongoose.connect(process.env.MONGO_URI);
                const user = await User.findOne({ email });
                if (user) {
                    const match = bcrypt.compareSync(password, user.password);
                    if (match) {
                        return user;
                    }
                }

            }
        })
    ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }