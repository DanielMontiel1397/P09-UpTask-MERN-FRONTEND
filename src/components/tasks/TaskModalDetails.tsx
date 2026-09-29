import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { editStatus, getTask } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { formatDate } from "../../helpers/formatearFecha";
import { statusTranslations } from "../../locales/es";
import type { TaskStatusType } from "../../types/TaskTypes";
import NotesPanel from "../notes/NotesPanel";



export default function TaskModalDetails() {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('task')!;

    const showModal = taskId ? true : false;

    const params = useParams();
    const idProject = params.idProject!;

    const queryClient = useQueryClient();

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTask({
            projectId: idProject,
            taskId: taskId
        }),
        enabled: !!taskId,
        retry: false
    })

    const { mutate } = useMutation({
        mutationFn: editStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['getProject', idProject] });
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
            toast.success(response.msg);
            navigate(location.pathname, { replace: true })
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const data = {
            projectId: idProject,
            taskId: taskId,
            status: e.target.value as TaskStatusType
        };

        mutate(data);
    }

    useEffect(() => {
        if (isError) {
            toast.error(error.message, { toastId: 'error' });
            <Navigate to={`/projects/${idProject}`} />
        }
    }, [isError, error, navigate, idProject])

    if (isError) {
        return null;
    }

    if (data) return (
        <Dialog
            open={showModal}
            onClose={() => navigate(location.pathname, { replace: true })}
            className="relative z-10 transition duration-300 ease-out data-closed:opacity-0"
        >
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
                <DialogPanel className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-16 shadow-xl transition duration-300 ease-out data-closed:scale-95 data-closed:opacity-0">
                    <p className="text-sm text-slate-400">
                        Agregada el: {formatDate(data.task.createdAt)}
                    </p>

                    <p className="text-sm text-slate-400">
                        Última actualización: {formatDate(data.task.updatedAt)}
                    </p>

                    <DialogTitle
                        as="h3"
                        className="my-5 text-4xl font-black text-slate-600"
                    >
                        {data.task.name}
                    </DialogTitle>

                    <p className="mb-2 text-lg text-slate-500">
                        Descripción: {data.task.description}
                    </p>


                    {data.task.completedBy?.length ? (
                        <>
                            <ul className="list-decimal">
                                <p className="text-2xl text-slate-500 mb-2">Historial de Cambios</p>
                                {data.task.completedBy && data.task.completedBy.map(taskModify => (
                                    <li
                                        key={taskModify._id}
                                    >
                                        <span className="font-bold text-slate-600">
                                            {statusTranslations[taskModify.status]} por:
                                        </span>{' '}
                                        {taskModify.user.name}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : null }



                    <div className="my-5 space-y-3">
                        <label className="font-bold">
                            Estado Actual: {statusTranslations[data.task.status]}

                            <select
                                className="w-full p-3 bg-white border border-gray-300 font-normal"
                                defaultValue={data.task.status}
                                onChange={handleChange}
                            >
                                {Object.entries(statusTranslations).map(([key, value]) => (
                                    <option
                                        key={key}
                                        value={key}

                                    >
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    
                    <NotesPanel
                        notes={data.task.notes}
                        taskId={data.task._id}
                    />
                </DialogPanel>
            </div>
        </Dialog>
    );
}