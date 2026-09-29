import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { statusTranslations } from "../../locales/es"
import type { GetTaskType, TaskStatusType } from "../../types/TaskTypes"
import DropTask from "./DropTask"
import TaskCard from "./TaskCard"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editStatus } from '../../api/TaskAPI';
import { toast } from 'react-toastify';
import {  useParams } from 'react-router-dom';
import type { GetProjectResponseType, ProjectDetailsType } from '../../types/ProjectTypes';

type TaskListProps = {
    tasks: ProjectDetailsType['tasks']
    canEdit: boolean
}

type GroupedTasks = {
    [key: string]: ProjectDetailsType['tasks']
}

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

const statusColors: { [key: string]: string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500',
}

export default function TasksList({ tasks, canEdit }: TaskListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const params = useParams();
    const idProject = params.idProject!;

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: editStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['getProject', idProject] });
            //queryClient.invalidateQueries({ queryKey: ['task', ] });
            toast.success(response.msg);
        }
    });

    const handleDragEnd = (e: DragEndEvent) => {
        const { over, active } = e;

        if (over && over.id) {
            const dataProject = {
                projectId: idProject,
                taskId: active.id.toString(),
                status: over.id.toString() as TaskStatusType
            }

            mutate(dataProject);

            queryClient.setQueryData(['getProject', idProject], (prevData : GetProjectResponseType) => {

                const updatedTasks = prevData.data.tasks.map((task: GetTaskType) => {
                    if(task._id === active.id){
                        return {
                            ...task,
                            status: over.id
                        }
                    }   
                    return task;
                })

                return {
                    ...prevData,
                    data: {
                        ...prevData.data,
                        tasks: updatedTasks
                    }
                }
            })
        }
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>

                <DndContext
                    onDragEnd={handleDragEnd}
                >
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>

                            <h3
                                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusColors[status]}`}
                            >
                                {statusTranslations[status]}
                            </h3>

                            <DropTask
                                status={status}
                            />

                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>

            </div>
        </>
    )
}
