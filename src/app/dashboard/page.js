"use client";
import Card from '@/components/Card';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DashboardPage = () => {
    const session = useSession();
    const { status } = session;

    const [notes, setNotes] = useState([]);
    const [filterNotes, setFilterNotes] = useState([]);
    const [length, setLength] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchNotes() {
            const { data } = await axios.get("/api/read");
            if (data.success) {
                setNotes(data.notes);
                setLength(data.noteLength);
            }
        }
        fetchNotes();
    }, [notes]);

    useEffect(() => {
        if (notes) {
            function filters() {
                const filtered = notes.filter(note => (
                    note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase())
                ));
                setFilterNotes(filtered);
            }
            filters();
        }

    }, [notes, search]);

    if (status === "loading") {
        return "Loading...";
    }

    if (status === "unauthenticated") {
        return redirect("/");
    }

    return (
        <>
            <div className='my-5 flex justify-end items-center px-3'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type='search' className='h-[30px] rounded-md px-2 text-sm bg-gray-200 outline-none ' placeholder='Search..' />
            </div>
            <div className='px-2 py-5 grid grid-cols-1 md:grid md:grid-cols-3 gap-3'>
                {filterNotes && (
                    filterNotes.map(note => (
                        <Card note={note} key={note._id} />
                    ))

                )}
            </div>

            {length === 0 && (
                <div className='flex flex-col items-center justify-center'>
                    <Image src="/emptyNote.png" width="500" height="500" />
                    <div className='mb-5'>
                        <p className=''>
                            Do not wait!...<Link href={"/dashboard/create"} className='text-xl underline hover:text-yellow-600 font-bold text-yellow-400'>Create a Note</Link>
                        </p>

                    </div>
                </div>
            )}

        </>

    )
}

export default DashboardPage