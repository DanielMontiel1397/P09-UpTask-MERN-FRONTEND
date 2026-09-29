import type z from "zod";
import type { getProjectsResponseSchema, projectDetailsSchema, projectSchema } from "../schemas/ProjectSchema";

////TYPES DE PROYECTOS GENERAL

export type ProjectType = z.infer<typeof projectSchema>

export type ProjectDetailsType = z.infer<typeof projectDetailsSchema>


export type ProjectsType = ProjectType[];

//Formulario Crear Proyecto
export type CreateProjectType = Pick<ProjectType, 'projectName' | 'clientName' | 'description'>;

//CREAR PROYECTO

export type CreateProyectType = Omit<ProjectType, 'tasks'>

export type CreateProjectResponseType = {
    msg: string,
    data: CreateProjectType
}


////OBTENER TODOS LOS PROYECTOS

export type GetProjectsType  = z.infer<typeof getProjectsResponseSchema>

export type GetProjectsResponseType = {
    data: ProjectType[]
}

////OBTENER PROYECTO
export type GetProjectResponseType = {
    data: ProjectDetailsType
}

////EDITAR UN PROYECTO
export type EditProjectResponseType = {
    msg: string
}

//ELIMINAR UN PROYECTO
export type DeleteProjectResponseType = {
    ok: true,
    msg: string
}
