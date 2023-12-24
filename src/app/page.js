"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { redirect } from 'next/navigation';

export default function Home() {

  const session = useSession();
  const { status } = session;

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "authenticated") {
    return redirect("/dashboard");
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-[665px] gap-5'>
      <h1 className='text-xl md:text-3xl  font-bold'>
        Quick Notes at Your Fingertips.
      </h1>
      <Link href={"/register"} className='bg-yellow-400 px-3 py-2 rounded-lg text-white'>Write now!</Link>
    </div>
  )
}
