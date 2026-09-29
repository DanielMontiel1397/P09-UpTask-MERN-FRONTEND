///Schema para formulario Task

import z from "zod";
import { noteSchemaDetails } from "./NoteSchema";
//import { projectDetailsSchema } from "./ProjectSchema";

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    status: taskStatusSchema,
    project: z.string(),
    completedBy: z.array(
        z.object({
            user: z.string(),
            status: taskStatusSchema
        })
    ).nullable(),
    notes: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
});

export const taskBasicSchema = taskSchema.pick({
    _id: true,
    name: true,
    status: true
});


export const taskSchemaDetails = taskSchema.extend({
    completedBy: z.array(
        z.object({
            user: z.object({
                _id: z.string(),
                name: z.string()
            }),
            status: taskStatusSchema,
            _id: z.string()
        })
    ).nullable(),
    notes: z.array(noteSchemaDetails)
})


export const formTaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema
})


////CREAR TAREA

export const createTaskSchemaResponse = z.object({
    data: z.object({
        Task: taskSchema
    }),
    msg: z.string()
})

//OBTENER TAREAS


export const getTasksSchemaResponse = z.object({
    data: z.object({
        Task: z.array(taskSchema.pick({
            _id: true,
            name: true,
            description: true,
            status: true,
            project: true,
            createdAt: true,
            updatedAt: true
        }))
    }),
    msg: z.string()
})

//OBTENER TAREA
export const getTaskSchemaResponse = z.object({
    data: z.object({
        Task: taskSchemaDetails
    }),
    msg: z.string()
})

//EDITAR TAREA
export const taskEditSchemaResponse = z.object({
    data: z.object({
        Task: taskSchema
    }),
    msg: z.string()
})

//ELIMINAR TAREA
export const taskDeleteSchemaResponse = z.object({
    msg: z.string()
})

//ACTUALIZAR ESTADO
export const taskEditStatusSchemaResponse = z.object({
    data: z.object({
        Task: taskSchema
    }),
    msg: z.string()
})