"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

const Header = () => {

    const session = useSession();
    const { status } = session;

    return (
        <header className='bg-yellow-400 px-2 py-3 flex items-center justify-between'>
            <div>
                <Link href={"/"} className='text-2xl font-bold'>
                    <h1>ToDoZen</h1>
                </Link>
            </div>
            {status === "unauthenticated" ? (
                <div className='flex gap-5 items-center'>
                    <Link href={"/login"} className='hover:underline'>Login</Link>
                    <Link href={"/register"} className='bg-blue-400 px-2 py-1 rounded-lg text-white hover:text-blue-400 hover:border-2 hover:border-blue-400 hover:bg-white'>Register</Link>
                </div>
            ) : (
                <div className='flex gap-5 items-center'>
                    <Link href={"/dashboard/create"} className='px-2 py-1 bg-green-400 rounded-md text-white hover:border-2 hover:border-green-400 hover:bg-white hover:text-green-400'>New+</Link>
                    <button onClick={() => signOut()} className='bg-blue-400 px-2 py-1 text-sm rounded-lg text-white hover:text-blue-400 hover:border-2 hover:border-blue-400 hover:bg-white'>Sign out</button>
                </div>
            )}

        </header>
    )
}

export default Header