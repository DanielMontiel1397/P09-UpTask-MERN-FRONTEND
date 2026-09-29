import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import type { ForgotPasswordFormType } from "../../types/AuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormSchema } from "../../schemas/AuthSchema";
import { useMutation } from "@tanstack/react-query";
import { generateCodeForgotPassword } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    const [successMessage, setSuccessMessage] = useState('');

    const initialValues: ForgotPasswordFormType = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(ForgotPasswordFormSchema)
    });

    const { mutate, isPending } = useMutation({
        mutationFn: generateCodeForgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            if (response.ok) {
                setSuccessMessage(response.msg)
                reset()
                toast.success(response.msg)
            }
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordFormType) => {
        if (isPending) return;
        mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                ¿Olvidaste tu contraseña? coloca tu email {''}
                <span className=" text-fuchsia-500 font-bold"> y reestablecela</span>
            </p>

            {successMessage ? (
                <div className="space-y-6 p-10 bg-white text-center mt-10">
                    <h2 className="text-3xl font-black text-green-600">!Perfecto!</h2>
                    <p className="text-lg text-gray-700">{successMessage}</p>
                </div>
            ) : (


                <form
                    onSubmit={handleSubmit(handleForgotPassword)}
                    className="space-y-8 p-10 mt-10 bg-white"
                    noValidate
                >
                    <div className="flex flex-col gap-5">
                        <label
                            className="font-normal text-2xl"
                            htmlFor="email"
                        >Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
                            disabled={isPending}
                            className="w-full p-3 border-gray-300 border disabled:bg-gray-100 disabled:cursor-not-allowed"
                            {...register("email")}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-400 disabled:cursor-not-allowed w-full p-3 text-white font-black text-xl cursor-pointer transition"
                    >
                        {isPending ? 'Enviando...' : 'Enviar Instrucciones'}
                    </button>
                </form>
            )}

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/login'
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>

                <Link
                    to='/auth/register'
                    className="text-center text-gray-300 font-normal"
                >
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </>
    )
}