"use client";

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const CreatePage = () => {

    const session = useSession();
    const { status } = session;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [creating, setCreating] = useState(null);
    const [created, setCreated] = useState(null);
    const [error, setError] = useState(null);

    async function handleCreate(e) {
        setCreating(true);
        setCreated(false);
        setError(false);
        e.preventDefault();
        const { data } = await axios.post("/api/create", { title, content });
        if (data.success) {
            setCreated(data.message);
            setCreating(false);
            setTitle("");
            setContent("");
        }
        else {
            setError(data.message);
            setCreating(false);
        }
    }

    if (status === "loading") {
        return "Loading...";
    }

    if (status === "unauthenticated") {
        return redirect("/");
    }

    return (
        <div className="w-full max-w-xl mx-auto py-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleCreate}>
                <h1 className='text-center text-xl text-yellow-400 text-bold my-2 mb-5'>Create Note</h1>
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
                    <label className="block text-gray-700 text-sm font-semibold mb-2" for="title">
                        Title
                    </label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" />
                </div>
                <div className="mb-6">

                    <label for="message" className="block mb-2 text-sm font-semibold">Your message</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your Note here..."></textarea>

                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-yellow-500 w-full hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Create
                    </button>

                </div>
            </form>
        </div>
    )
}

export default CreatePage