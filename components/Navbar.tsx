import React from 'react'
import Link from 'next/link'
import {auth, signIn, signOut} from "@/auth"
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const Navbar = async () => {
    const session = await auth();

  return (
    <header className='px-5 py-3 bg-white font-sans'>
        <nav className='flex justify-between items-center font-bold text-cyan-800 text-3xl'>
            <Link href="/">NavBar</Link>

        <div className='flex items-center gap-3 text-sm mr-4 text-black'>
            {session && session?.user ? (
                <>
                    <Link href="/start/create">
                    <span className='max-sm:hidden'>Create</span>
                    <BadgePlus className='size-6 sm:hidden' />
                    </Link>

                    <form action={async () => {
                        "use server";
                        await signOut();
                    }}>
                        <button type="submit">
                            <span className='max-sm:hidden'>Logout</span>
                            <LogOut className='size-6 sm:hidden text-red-500' />
                        </button>
                    </form>

                    <Link href={"/user/${session?.id}"}><Avatar className='size-10'>
                        <AvatarImage src={session?.user?.image || "https://dummyimage.com/48x48/01667d/ff9cff.png"} alt={session?.user?.name || ''}/>
                        <AvatarFallback>AV</AvatarFallback>
                    </Avatar ></Link>
                </>
            ) : (
                <form action={async () => {
                    "use server";
                    await signIn("github");
                }}>
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
        </nav>
    </header>
  )
}

export default Navbar