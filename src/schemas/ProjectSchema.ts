import { z } from 'zod';
import { taskBasicSchema, taskSchema } from './TaskSchema';
import { UserSchemaResponse } from './AuthSchema';

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: UserSchemaResponse,
    createdAt: z.string(),
    updatedAt: z.string(),
    tasks: z.array(taskBasicSchema)
})

export const projectDetailsSchema = projectSchema.extend({
    tasks: z.array(taskSchema.pick({
        _id: true,
        name: true,
        description: true,
        status: true,
        project: true,
        createdAt: true,
        updatedAt: true
    })),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
});

////CREAR PROYECTO

export const createProjectResponseSchema = z.object({
    data: projectSchema.pick({
        _id: true,
        clientName: true,
        description: true,
        manager: true,
        createdAt: true,
        updatedAt: true,
        projectName: true
    }),
    msg: z.string()
})

/////OBTENER PROYECTO

export const getProjectResponseSchema = z.object({
    data: projectDetailsSchema
})

////OBTENER PROYECTOS

export const getProjectsResponseSchema = z.object({
    data: z.array(projectSchema)
})

/////EDITAR PROYECTO

export const editProjectResponseSchema = z.object({
    msg: z.string()
})

export const deleteProjectResponseSchema = z.object({
    msg: z.string()
})