import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formNoteSchema } from "../../schemas/NoteSchema"
import type { FormNoteType } from "../../types/NoteTypes"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { crearNota } from "../../api/NoteAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import type { TaskType } from "../../types/TaskTypes"

type AddNoteFormProps = {
    taskId: TaskType['_id']
}

export default function AddNoteForm({taskId} : AddNoteFormProps) {

    const params = useParams();
    const idProject = params.idProject!;

    const initialValues : FormNoteType = {
        content: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(formNoteSchema)
    });

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: crearNota,
        onSuccess: response => {
            toast.success(response.msg);
            reset();
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        },
        onError: error => {
            toast.error(error.message);
            reset();
        }
    })

    const handleCreateNote = (dataForm : FormNoteType) => {
        const data = {
            projectId: idProject,
            dataForm,
            taskId
        };

        mutate(data);
    }

    return (
        <form
            onSubmit={handleSubmit(handleCreateNote)}
            className='space-y-4'
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="content" className="font-bold">Crear Nota</label>
                <input
                    type="text"
                    id='content'
                    placeholder='Contenido de la nota'
                    className='w-full p-3 border border-gray-300'
                    {...register("content")}
                />

                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>

            <input
                type="submit"
                value="Crear Nota"
                className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer'
            />
        </form>
    )
}
