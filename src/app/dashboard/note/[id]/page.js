"use client";

import axios from 'axios';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const NotePage = ({ params }) => {

    const noteId = params.id;

    const [note, setNote] = useState("");
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        async function fetchSingleNote() {
            const { data } = await axios.get(`/api/read/${noteId}`);
            if (data.success) {
                setNote(data.note);
            }
        }
        fetchSingleNote();
    }, [noteId]);

    async function handleDelete(id) {
        const { data } = await axios.delete(`/api/delete/${id}`);
        if (data.success) {
            setDeleted(true);
        }
    }

    if (deleted) {
        return redirect("/dashboard");
    }

    return (
        <>
            {note && (
                <div className='flex flex-col items-center py-10 gap-3'>
                    <h1 className='text-2xl font-bold'>{note.title}</h1>
                    <div className=' max-w-3xl overflow-scroll'>
                        <p className='my-5 text-gray-500 max-w-full whitespace-normal'>{note.content}</p>
                    </div>
                    <div className='flex gap-5'>
                        <Link href={`/dashboard/update/${noteId}`} className='px-3 py-1 bg-gray-100 rounded-lg hover:border hover:border-yellow-400 text-yellow-400'>Update</Link>
                        <button onClick={() => handleDelete(noteId)} className='px-3 py-1 bg-gray-100 rounded-lg hover:border hover:border-red-400 text-red-400'>Delete</button>
                    </div>
                </div>
            )}
        </>

    )
}

export default NotePage