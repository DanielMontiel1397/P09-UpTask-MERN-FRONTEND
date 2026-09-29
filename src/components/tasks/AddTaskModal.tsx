import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import type { TaskFormDataType } from "../../types/TaskTypes";
import { useForm } from "react-hook-form";
import { createTask } from "../../api/TaskAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function AddTaskModal() {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get('newTask');
    const show = modalTask ? true : false;

    //Ob ProyectId
    const {idProject} = useParams();

    //FORMULARIO
    const initialVAlues : TaskFormDataType = {
        name: '',
        description: ''
    };

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: initialVAlues
    });

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['getProject', idProject]});
            toast.success(response.msg);
            reset()
            navigate(location.pathname, { replace: true })
        }
    })

    const handleCreateTask = (dataForm : TaskFormDataType) => {
        const data = {
            dataForm,
            projectId: idProject || ''
        }

        mutate(data);
    }

    return (
        <Dialog
            open={show}
            onClose={() => navigate(location.pathname, { replace: true })}
            className="relative z-50"
        >
            <DialogBackdrop
                transition
                className="
                    fixed inset-0 bg-black/60
                    transition duration-300
                    data-[closed]:opacity-0
                "
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="
                        w-full max-w-4xl rounded-2xl bg-white p-16 shadow-xl
                        transition duration-300
                        data-[closed]:scale-95
                        data-[closed]:opacity-0
                    "
                >
                    <DialogTitle className="text-4xl font-black my-5">
                        Nueva Tarea
                    </DialogTitle>

                    <p className="text-xl font-bold">
                        Llena el formulario y crea{" "}
                        <span className="text-fuchsia-600">
                            una tarea
                        </span>
                    </p>

                    <form
                        className="mt-10 space-y-3"
                        onSubmit={handleSubmit(handleCreateTask)}
                        noValidate
                    >

                        <TaskForm
                            register={register}
                            errors={errors}
                        />
                        <input
                            type="submit"
                            value='Agregar Tarea'
                            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                        />
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
}