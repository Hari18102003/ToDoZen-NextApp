"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UpdatePage = ({ params }) => {

    const noteId = params.id;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(null);
    const [saved, setSaved] = useState(null);

    useEffect(() => {
        async function fetchSingleNote() {
            const { data } = await axios.get(`/api/read/${noteId}`);
            if (data.success) {
                setTitle(data.note.title);
                setContent(data.note.content);
            }
        }
        fetchSingleNote();
    }, [noteId]);

    async function handleUpdate(e) {
        e.preventDefault();
        setSaving(true);
        setSaved(false);
        const { data } = await axios.put(`/api/update/${noteId}`, { title, content });
        if (data.success) {
            setSaving(false);
            setSaved(data.message);
        }
    }

    return (
        <div className="w-full max-w-xl mx-auto py-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleUpdate}>
                <h1 className='text-center text-xl text-yellow-400 text-bold my-2 mb-5'>Update Note</h1>
                {saving && (
                    <p className='bg-gray-200 border border-gray-500 text-center py-2 mb-2 text-sm'>Saving...</p>
                )}
                {saved && (
                    <p className='bg-green-200 border border-green-500 text-center py-2 mb-2 text-sm'>{saved}</p>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" />
                </div>
                <div className="mb-6">

                    <label htmlFor="message" className="block mb-2 text-sm font-semibold">Your message</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your Note here..."></textarea>

                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-yellow-500 w-full hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save
                    </button>

                </div>
            </form>
        </div>
    )
}

export default UpdatePage