import type z from "zod";
import type { formTaskSchema, taskSchema, taskSchemaDetails, taskStatusSchema } from "../schemas/TaskSchema";

export type TaskStatusType = z.infer<typeof taskStatusSchema>

export type TaskType = z.infer<typeof taskSchema>

export type TaskDetailsType = z.infer<typeof taskSchemaDetails>

export type Task = z.infer<typeof formTaskSchema>

export type TaskFormDataType = Pick<Task, 'name' | 'description'>;



//OBTENER TAREA
export type GetTaskType = Pick<TaskType, '_id' | 'updatedAt' | 'createdAt' | 'status' | 'name' | 'description' | 'project'>

export type GetTaskResponseType = {
    ok: true,
    task: TaskDetailsType,
    msg: string
}

//Obtener todas las tareas

export type GetAllTaskResponseType = {
    ok: true,
    data: GetTaskType[],
    msg: string
}

//EDITAR TAREA
export type TaskEditResponseType = {
    ok: true,
    msg: string
}

//ELIMINAR TAREA
export type TaskDeleteResponseType = {
    ok: true,
    msg: string
}