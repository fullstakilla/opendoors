"use client"

import Image from 'next/image'
import React from 'react'


interface AvatarProps {
    src: string | null | undefined
};

const Avatar: React.FC<AvatarProps> = ({src}) => {
    return (
        <div>
            <Image 
                className='rounded-full'
                width={30}
                height={30}
                src={ src || "/images/avatar.jpg"}
                alt='Avatar'
            />
        </div>
    )
}

export default Avatar