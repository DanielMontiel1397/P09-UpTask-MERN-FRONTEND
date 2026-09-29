import axios from "axios";
import { ErrorResponseSchema } from "../schemas/GeneralSchema";
import clienteAxios from "../config/axios";
import type { ErrorResponseType } from "../types/GeneralTypes";
import { createTaskSchemaResponse, getTaskSchemaResponse, getTasksSchemaResponse, taskDeleteSchemaResponse, taskEditSchemaResponse, taskEditStatusSchemaResponse } from "../schemas/TaskSchema";
import type { GetAllTaskResponseType, GetTaskResponseType, TaskDeleteResponseType, TaskEditResponseType, TaskFormDataType, TaskType } from "../types/TaskTypes";
import type { ProjectType } from "../types/ProjectTypes";

const respuestaError: ErrorResponseType = {
    errorTypado: 'Hubo un error al procesar la información',
    errorConexión: 'Error de conexión, revisar su conexión a internet'
};

type TaskApi = {
    dataForm: TaskFormDataType,
    projectId: ProjectType["_id"],
    taskId: TaskType["_id"],
    status: TaskType["status"]
}

export async function createTask({ dataForm, projectId }: Pick<TaskApi, 'dataForm'|'projectId'>) {

    const url = `/projects/${projectId}/tasks`;

    try {

        const { data } = await clienteAxios.post(url, dataForm);

        const result = createTaskSchemaResponse.safeParse(data);

        if (result.success) {
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

export async function getAllTask(): Promise<GetAllTaskResponseType> {

    try {
        const { data } = await clienteAxios.get("/tasks");
        
        const result = getTasksSchemaResponse.safeParse(data);
        
        if (result.success) {
            return {
                ok: true,
                data: result.data.data.Task,
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

export async function getTask({projectId, taskId} : Pick<TaskApi, 'projectId'|'taskId'>) : Promise<GetTaskResponseType> {
    const url = `/projects/${projectId}/tasks/${taskId}`;

    try {
        
        const {data} = await clienteAxios.get(url);
        
        const result = getTaskSchemaResponse.safeParse(data);
        
        if(result.success){
            return {
                ok: true,
                task: result.data.data.Task,
                msg: result.data.msg
            }
        }

        throw new Error(respuestaError.errorTypado, {
            cause: respuestaError.errorTypado
        });

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

export async function editTask({ dataForm, projectId, taskId }: Pick<TaskApi, 'dataForm'|'projectId'|'taskId'>) : Promise<TaskEditResponseType> {
    const url = `/projects/${projectId}/tasks/${taskId}`;

    try {

        const { data } = await clienteAxios.put(url, dataForm);

        const result = taskEditSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                msg: result.data.msg
            }
        }

        throw new Error(respuestaError.errorTypado, {
            cause: respuestaError.errorTypado
        });

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

export async function deleteTask({projectId, taskId} : Pick<TaskApi, 'projectId'|'taskId'>) : Promise<TaskDeleteResponseType> {

    const url = `/projects/${projectId}/tasks/${taskId}`;
    console.log(url);
    try {
        
        const {data} = await clienteAxios.delete(url);

        const result = taskDeleteSchemaResponse.safeParse(data);
        console.log(result);
        if(result.success){
            return {
                ok: true,
                msg: result.data.msg
            }
        }

        throw new Error(respuestaError.errorTypado, {
            cause: respuestaError.errorTypado
        });

    } catch (error) {
        console.log(error);
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

export async function editStatus({ projectId, taskId, status }: Pick<TaskApi, 'projectId'|'taskId'|'status'>) : Promise<TaskEditResponseType> {
    const url = `/projects/${projectId}/tasks/${taskId}`;

    try {

        const { data } = await clienteAxios.patch(url, {status});

        const result = taskEditStatusSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                msg: result.data.msg
            }
        }

        throw new Error(respuestaError.errorTypado, {
            cause: respuestaError.errorTypado
        });

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