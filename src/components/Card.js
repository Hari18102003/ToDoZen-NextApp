"use client";

import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Card = ({ note }) => {

    async function handleDelete(id) {
        await axios.delete(`/api/delete/${id}`);
    }

    return (

        <div className="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <Link href={`/dashboard/note/${note._id}`}>
                <h5 className="mb-2 text-xl font-semibold tracking-tight">{note.title}</h5>
                <p className="font-normal text-gray-700 ">{note.content.length > 20 ? (note.content.substring(0, 20) + "...") : (note.content)}</p>
            </Link>
            <div className='mt-3 flex justify-between items-center'>
                <Link href={`/dashboard/update/${note._id}`}> <FaRegEdit className='text-yellow-400 text-lg' /> </Link>
                <button onClick={() => handleDelete(note._id)}><FaTrashAlt className='text-red-400 text-lg' /></button>
            </div>
        </div>

    )
}

export default Card