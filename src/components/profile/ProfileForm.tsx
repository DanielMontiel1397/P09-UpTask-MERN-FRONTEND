import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import type { ProfileFormType } from "../../types/ProfileTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfileFormSchema } from "../../schemas/ProfileSchema"
import type { GetUserResponseType } from "../../types/AuthTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editarPerfil } from "../../api/ProfileAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: GetUserResponseType['data']
}

export default function ProfileForm({ data }: ProfileFormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: data.name,
            email: data.email
        },
        resolver: zodResolver(ProfileFormSchema)
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: editarPerfil,
        onSuccess: response => {
            toast.success(response.msg);
            queryClient.invalidateQueries({queryKey: ['getUser']})
        }, 
        onError: error => {
            toast.error(error.message)
        }
    })

    const handleEditProfile = (formData: ProfileFormType) => { 
        mutate({
            dataForm: formData
        })
    }

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border border-gray-200"
                            {...register("name")}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >E-mail</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3  border border-gray-200"
                            {...register("email")}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value='Guardar Cambios'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}