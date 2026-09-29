import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../../ErrorMessage";
import type { MemberFormType } from "../../../types/TeamTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { MembersFormSchema } from "../../../schemas/TeamSchema";
import { searchMember } from "../../../api/TeamAPI";
import { toast } from "react-toastify";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {

    const initialValues: MemberFormType = {
        email: ''
    }

    const params = useParams()
    const projectId = params.idProject!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(MembersFormSchema)
    })

   

    const mutation = useMutation({
        mutationFn: searchMember,
        onSuccess: response => {
            
            toast.success(response.msg)

        },
        onError: error => {
            toast.error(error.message)
        }
    })

    const handleSearchUser = async (dataForm: MemberFormType) => {
        const data = {
            dataForm,
            projectId
        };

        mutation.mutate(data);
    }

    const resetData = () => {
        reset();
        mutation.reset();
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >E-mail de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email")}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>

            <div className="mt-10">
                {mutation.isPending && <p className="text-center " >Cargando...</p>}
                {mutation.data &&
                    <SearchResult 
                    user={mutation.data.data} 
                    reset={resetData}
                    />
                }
            </div>
        </>
    )
}