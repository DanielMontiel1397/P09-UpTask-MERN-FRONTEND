import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { CheckPasswordFormType } from '../../types/AuthTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckPasswordFormSchema } from '../../schemas/AuthSchema';
import { checkPassword } from "../../api/AuthAPI";
import { deleteProject } from "../../api/ProjectAPI";

export default function DeleteProjectModal() {
    const initialValues: CheckPasswordFormType = {
        password: ''
    }
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(CheckPasswordFormSchema)
    })

    const queryClient = useQueryClient();

    const checkUserPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => {
            toast.error(error.message);
            reset();
        }
    })

    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success(response.msg);
            navigate('/');
        }
    })

    const handleSubmitForm = async (dataFormCheckPassword : CheckPasswordFormType) => {

        const data = {
            password: dataFormCheckPassword
        }

        await checkUserPasswordMutation.mutateAsync(data)

        await deleteProjectMutation.mutateAsync(deleteProjectId)

        reset();
    }



    return (
        <Dialog
            open={show}
            onClose={() => navigate(location.pathname, { replace: true })}
            className="relative z-10"
        >
            <div
                className="fixed inset-0 bg-black/60 transition duration-300 data-closed:opacity-0"
                aria-hidden="true"
            />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">

                    <DialogPanel
                        transition
                        className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-16 text-left align-middle shadow-xl transition duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
                    >
                        <DialogTitle
                            as="h3"
                            className="my-5 text-4xl font-black"
                        >
                            Eliminar Proyecto
                        </DialogTitle>

                        <p className="text-xl font-bold">
                            Confirma la eliminación del proyecto{" "}
                            <span className="text-fuchsia-600">
                                colocando tu password
                            </span>
                        </p>

                        <form
                            className="mt-10 space-y-5"
                            onSubmit={handleSubmit(handleSubmitForm)}
                            noValidate
                        >
                            <div className="flex flex-col gap-3">
                                <label
                                    className="text-2xl font-normal"
                                    htmlFor="password"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password Inicio de Sesión"
                                    className="w-full border border-gray-300 p-3"
                                    {...register("password")}
                                />

                                {errors.password && (
                                    <ErrorMessage>
                                        {errors.password.message}
                                    </ErrorMessage>
                                )}
                            </div>

                            <input
                                type="submit"
                                className="w-full cursor-pointer bg-fuchsia-600 p-3 text-xl font-black text-white hover:bg-fuchsia-700"
                                value="Eliminar Proyecto"
                            />
                        </form>
                    </DialogPanel>

                </div>
            </div>
        </Dialog>
    );
}