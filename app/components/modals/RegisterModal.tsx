"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import { useCallback, useState } from "react";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/register", data)
            .then(() => {
                toast.success("Success !")
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error("Something went wrong...");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    },[registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to Open Doors"
                subtitle="Create an account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading} 
                register={register}
                errors={errors}
                required 
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading} 
                register={register}
                errors={errors}
                required 
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading} 
                register={register}
                errors={errors}
                required 
            />
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSumbit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    )
}

export default RegisterModal