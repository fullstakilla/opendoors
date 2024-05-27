"use client"

import {AiOutlineMenu} from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { signOut } from "next-auth/react"
import { SafeUser } from "@/app/types"
import "@/app/globals.css"
import useRentModal from "@/app/hooks/useRentModal"
import { useRouter } from "next/navigation"


interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);
    const rentModal = useRentModal();
    const router = useRouter()

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal])
    
    return (
        <div className="relative">
            <div className="flex felx-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-xl hover:bg-neutral-100 transition cursor-pointer">
                    Nest your home
                </div>
                <div onClick={toggleOpen} className="user-menu-border p-4 md:py-1 md:px-2 border-[1px] border-neutral-900 flex felx-row items-center gap-3 rounded-xl cursor-pointer transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="user-menu-border absolute rounded-xl  w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem 
                                    onClick={() => router.push("/trips")}
                                    label="My Trips"
                                />
                                <MenuItem 
                                    onClick={() => router.push("/favorites")}
                                    label="My Favorites"
                                />
                                <MenuItem 
                                    onClick={() => router.push("/reservations")}
                                    label="My Reservations"
                                />
                                <MenuItem 
                                    onClick={() => router.push("/properties")}
                                    label="My Properties"
                                />
                                <MenuItem 
                                    onClick={rentModal.onOpen}
                                    label="Nest my home"
                                />
                                <hr />
                                <MenuItem 
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                            ) : (
                            <>
                                <MenuItem 
                                    onClick={loginModal.onOpen}
                                    label="Sign In"
                                />
                                <MenuItem 
                                    onClick={registerModal.onOpen}
                                    label="Sign Up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu