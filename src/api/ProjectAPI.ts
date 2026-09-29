import axios from "axios";
import clienteAxios from "../config/axios";
import type { CreateProjectResponseType, CreateProjectType, DeleteProjectResponseType, EditProjectResponseType, GetProjectResponseType, GetProjectsResponseType, ProjectDetailsType } from "../types/ProjectTypes";
import type { ErrorResponseType } from "../types/GeneralTypes";
import { ErrorResponseSchema } from "../schemas/GeneralSchema";
import { createProjectResponseSchema, deleteProjectResponseSchema, editProjectResponseSchema, getProjectResponseSchema, getProjectsResponseSchema } from "../schemas/ProjectSchema";

const respuestaError: ErrorResponseType = {
    errorTypado: 'Error de conexión, revisar su conexión a internet',
    errorConexión: 'Hubo un error al procesar la información'
};

export async function createProject(dataForm: CreateProjectType): Promise<CreateProjectResponseType> {

    try {

        const { data } = await clienteAxios.post('/projects', dataForm);

        const result = createProjectResponseSchema.safeParse(data);

        if (result.success) {
            return {
                msg: result.data.msg,
                data: result.data.data
            }
        }

        throw new Error(respuestaError.errorTypado);

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {

            const result = ErrorResponseSchema.safeParse(error.response.data);

            if (result.success) {
                throw new Error(result.data.error, {
                    cause: error
                });
            }

            throw new Error(respuestaError.errorTypado, {
                cause: error
            });

        }

        throw new Error(respuestaError.errorConexión, {
            cause: error
        });
    }
}

export async function getProjects() : Promise<GetProjectsResponseType> {
    try {
        
        const {data} = await clienteAxios.get('/projects');
        
        const result = getProjectsResponseSchema.safeParse(data);
        
        if(result.success){
            return {
                data: result.data.data
            }
        }

        throw new Error(respuestaError.errorTypado, {
            cause: respuestaError.errorTypado
        })

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {

            const result = ErrorResponseSchema.safeParse(error.response.data);

            if (result.success) {
                throw new Error(result.data.error, {
                    cause: error
                });
            }

            throw new Error(respuestaError.errorTypado, {
                cause: error
            });

        }

        throw new Error(respuestaError.errorConexión, {
            cause: error
        });

    }
}

export async function getProject(idProyect : ProjectDetailsType['_id']) : Promise<GetProjectResponseType> {
    try {
        
        const {data} = await clienteAxios.get(`/projects/${idProyect}`);
       
        const result = getProjectResponseSchema.safeParse(data);
        
        if(result.success){
            return {
                data: result.data.data
            }
        }

        throw new Error(respuestaError.errorTypado, {
            cause: respuestaError.errorTypado
        })

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {

            const result = ErrorResponseSchema.safeParse(error.response.data);

            if (result.success) {
                throw new Error(result.data.error, {
                    cause: error
                });
            }

            throw new Error(respuestaError.errorTypado, {
                cause: error
            });

        }

        throw new Error(respuestaError.errorConexión, {
            cause: error
        });

    }
}

type ProjectEditType = {
    dataForm: CreateProjectType,
    projectId: string
}

export async function editProject({dataForm, projectId} : ProjectEditType) : Promise<EditProjectResponseType> {

    try {
        
        const {data} = await clienteAxios.put(`/projects/${projectId}`, dataForm);

        const result = editProjectResponseSchema.safeParse(data);

        if(result.success){
            return {
                msg: result.data.msg
            }
        }

        throw new Error(respuestaError.errorTypado, {
            cause: respuestaError.errorTypado
        })

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {

            const result = ErrorResponseSchema.safeParse(error.response.data);

            if (result.success) {
                throw new Error(result.data.error, {
                    cause: error
                });
            }

            throw new Error(respuestaError.errorTypado, {
                cause: error
            });

        }

        throw new Error(respuestaError.errorConexión, {
            cause: error
        });

    }

}

export async function deleteProject(projectId : ProjectDetailsType['_id']) : Promise<DeleteProjectResponseType> {

    try {
        
        const {data} = await clienteAxios.delete(`/projects/${projectId}`);

        const result = deleteProjectResponseSchema.safeParse(data);

        if(result.success){
            return {
                ok: true,
                msg: result.data.msg
            }
        }

        throw new Error(respuestaError.errorTypado, {
            cause: respuestaError.errorTypado
        })

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {

            const result = ErrorResponseSchema.safeParse(error.response.data);

            if (result.success) {
                throw new Error(result.data.error, {
                    cause: error
                });
            }

            throw new Error(respuestaError.errorTypado, {
                cause: error
            });

        }

        throw new Error(respuestaError.errorConexión, {
            cause: error
        });

    }

}

