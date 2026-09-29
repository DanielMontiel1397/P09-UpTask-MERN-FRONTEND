import { Link } from "react-router-dom";
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { confirmEmail } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmEmail() {

    const [token, setToken] = useState('')
    const [isVerified, setIsVerified] = useState(false)

    const {mutate} = useMutation({
        mutationFn: confirmEmail,
        onError: (error) => {
            toast.error(error.message)
            setToken('')
        },
        onSuccess: (data) => {
            if (data.ok) {
                setIsVerified(true)
                toast.success(data.msg)
            }
        }
    })

    const handleChange = (token : string) => {
        setToken(token);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (token.length === 6) {
            mutate({token})
        }
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
            </p>

            {isVerified ? (
                <div className="space-y-8 p-10 bg-white mt-10 text-center">
                    <h2 className="text-3xl font-black text-green-600">¡Cuenta Verificada!</h2>
                    <p className="text-lg text-gray-700">Tu cuenta ha sido verificada exitosamente</p>
                    <Link
                        to='/auth/login'
                        className="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded transition"
                    >
                        Ir al Login
                    </Link>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="space-y-8 p-10 bg-white mt-10"
                >
                    <label
                        className="font-normal text-2xl text-center block"
                    >Código de 6 dígitos</label>

                    <div className="flex justify-center gap-5">
                        <PinInput value={token} onChange={handleChange}>
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                        </PinInput>
                    </div>

                    <button
                        type="submit"
                        disabled={token.length !== 6}
                        className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition"
                    >
                        Verificar Código
                    </button>

                </form>
            )}

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/nuevo-codigo'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>

        </>
    )
}