"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const Logo = () => {
    const router = useRouter();

    return (
        // <Image
        //     onClick={() => router.push("/")}
        //     alt='Logo'
        //     className='hidden md:block cursor-pointer'
        //     width={170}
        //     height={170}
        //     src="/images/logo.png"
        // />

        <span 
            onClick={() => router.push("/")}
            className='text-bold text-lg'
        >Open Your Doors</span>
    )
}

export default Logo