import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { NewTokenFormType } from "../../types/AuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewTokenFormSchema } from "../../schemas/AuthSchema";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { sendNewCode } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function SendNewCode() {
    const [successMessage, setSuccessMessage] = useState('');

    const initialValues: NewTokenFormType = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ 
        defaultValues: initialValues,
        resolver: zodResolver(NewTokenFormSchema) 
    });

    const { mutate, isPending } = useMutation({
        mutationFn: sendNewCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            if (data.ok) {
                setSuccessMessage(data.msg)
                reset()
                toast.success(data.msg)
            }
        }
    })

    const handleRequestCode = (formData: NewTokenFormType) => {
        if (isPending) return;
        mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Solicitar Código de Confirmación</h1>
            <p className="text-2xl font-light text-white mt-5">
                Coloca tu e-mail para recibir {''}
                <span className=" text-fuchsia-500 font-bold"> un nuevo código</span>
            </p>

            {successMessage ? (
                <div className="space-y-8 p-10 rounded-lg bg-white mt-10 text-center">
                    <h2 className="text-3xl font-black text-green-600">¡Código enviado!</h2>
                    <p className="text-lg text-gray-700">{successMessage}</p>
                    <button
                        type="button"
                        onClick={() => setSuccessMessage('')}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded transition"
                    >
                        Enviar otro código
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(handleRequestCode)}
                    className="space-y-8 p-10 rounded-lg bg-white mt-10"
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
                            className="w-full p-3 rounded-lg border-gray-300 border disabled:bg-gray-100 disabled:cursor-not-allowed"
                            {...register("email")}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-400 disabled:cursor-not-allowed w-full p-3 rounded-lg text-white font-black text-xl transition"
                    >
                        {isPending ? 'Enviando...' : 'Enviar Código'}
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
                    to='/auth/reestablecer-password'
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </>
    )
}