import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordFormSchema } from "../../schemas/AuthSchema";
import type { NewPasswordFormType } from "../../types/AuthTypes";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/AuthAPI";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
    token: string
}

export default function NewPasswordForm({token} : NewPasswordFormProps) {

    const navigate = useNavigate()

    const initialValues: NewPasswordFormType = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(NewPasswordFormSchema)
    });

    const {mutate} = useMutation({
        mutationFn: resetPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response.msg);
            reset();
            navigate('/auth/login')
        }
    })
    const handleNewPassword = (formData: NewPasswordFormType) => {
        mutate({
            data: formData,
            token: token
        })
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password")}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation")}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Establecer Password'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}