import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import type { GetTaskType } from "../../types/TaskTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProp = {
    task: GetTaskType;
    canEdit: boolean;
};

export default function TaskCard({ task, canEdit }: TaskCardProp) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
    });

    const navigate = useNavigate();
    const params = useParams();
    const idProject = params.idProject!;
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ["getProject", idProject],
            });
            toast.success(response.msg);
        },
    });

    const handleDelete = () => {
        const data = {
            projectId: idProject,
            taskId: task._id,
        };

        mutate(data);
    };

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
    <li
        ref={setNodeRef}
        style={style}
        className="relative flex justify-between gap-3 border border-slate-300 bg-white p-5 px-6"
    >
        <div className="flex min-w-0 flex-col gap-y-4">
            <button
                type="button"
                {...listeners}
                {...attributes}
                className="absolute left-1 top-1 cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing"
            >
                ☰
            </button>

            <button
                type="button"
                className="text-left text-xl font-bold text-slate-600"
                onClick={() =>
                    navigate(
                        location.pathname +
                            `?task=${task._id.toString()}`
                    )
                }
            >
                {task.name}
            </button>

            <p className="text-slate-500">{task.description}</p>
        </div>

        <div className="flex shrink-0 gap-x-6">
            <Menu as="div" className="relative">
                <MenuButton className="-m-2.5 block cursor-pointer rounded-full p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Opciones</span>
                    <EllipsisVerticalIcon
                        className="size-6"
                        aria-hidden="true"
                    />
                </MenuButton>

                <MenuItems
                    anchor="bottom end"
                    className="w-56 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-black/5 focus:outline-none"
                >
                    <MenuItem>
                        <button
                            type="button"
                            className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-900 data-focus:bg-gray-100"
                            onClick={() =>
                                navigate(
                                    location.pathname +
                                        `?task=${task._id.toString()}`
                                )
                            }
                        >
                            Ver tarea
                        </button>
                    </MenuItem>

                    {canEdit && (
                        <>
                            <MenuItem>
                                <button
                                    type="button"
                                    className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-900 data-focus:bg-gray-100"
                                    onClick={() =>
                                        navigate(
                                            location.pathname +
                                                `?editTask=${task._id.toString()}`
                                        )
                                    }
                                >
                                    Editar tarea
                                </button>
                            </MenuItem>

                            <MenuItem>
                                <button
                                    type="button"
                                    className="block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 data-focus:bg-red-50"
                                    onClick={handleDelete}
                                >
                                    Eliminar tarea
                                </button>
                            </MenuItem>
                        </>
                    )}
                </MenuItems>
            </Menu>
        </div>
    </li>
);
}