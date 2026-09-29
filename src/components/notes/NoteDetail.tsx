import { useMemo } from "react"
import { formatDate } from "../../helpers/formatearFecha"
import { useAuth } from "../../hooks/useAuth"
import type { NoteDetailsType } from "../../types/NoteTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteNoteById } from "../../api/NoteAPI"
import { toast } from "react-toastify"
import type { TaskType } from "../../types/TaskTypes"
import { useParams } from "react-router-dom"

type NoteDetailProps = {
    note: NoteDetailsType,
    taskId: TaskType['_id']
}

export default function NoteDetail({ note, taskId }: NoteDetailProps) {

    const params = useParams();
    const projectId = params.idProject!;

    const {data, isLoading} = useAuth();
    const canDelete = useMemo(() => data?.data._id === note.createdBy._id,[data, note])

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: DeleteNoteById,
        onSuccess: response => {
            toast.success(response.msg)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        },
        onError: error => {
            toast.error(error.message)
        }
    })

    const handleDeleteNote = () => {
        const data = {
            projectId,
            taskId,
            noteId: note._id
        }
        
        mutate(data);
    }

    if(isLoading) return 'cargando...'

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>

            {canDelete && (
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white gont-bold cursor-pointer transition-colors"
                    onClick={handleDeleteNote}
                >Eliminar</button>

            )}
        </div>
    )
}
