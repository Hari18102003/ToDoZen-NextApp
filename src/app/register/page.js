"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'



const RegisterPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [created, setCreated] = useState(null);
    const [creating, setCreating] = useState(null);
    const [error, setError] = useState(null);
    const session = useSession();
    const { status } = session;

    async function handleRegister(e) {
        setCreated(false);
        setError(false);
        setCreating(true);
        e.preventDefault();
        const { data } = await axios.post("/api/register", { email, password });
        if (data.success) {
            setCreated(data.message);
            setCreating(false);
            setEmail("");
            setPassword("");
        } else {
            setCreating(false);
            setError(data.message);
            setPassword("");
        }
    }

    if (status === "loading") {
        return "Loading...";
    }

    if (status === "authenticated") {
        return redirect("/dashboard");
    }

    return (
        <div className="w-full max-w-lg mx-auto py-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleRegister}>
                <h1 className='text-center text-yellow-400 font-bold text-xl my-5'>
                    Register
                </h1>
                {error && (
                    <p className='bg-red-200 border border-red-500 text-center py-2 mb-2 text-sm'>{error}</p>
                )}
                {creating && (
                    <p className='bg-gray-200 border border-gray-500 text-center py-2 mb-2 text-sm'>Creating...</p>
                )}
                {created && (
                    <p className='bg-green-200 border border-green-500 text-center py-2 mb-2 text-sm'>{created}</p>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline" type="submit">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage