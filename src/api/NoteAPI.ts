import axios from "axios"
import type { CreateNoteResponseType, DeleteNoteByIdResponseType, FormNoteType, GetNotesByTaskResponseType, NoteType } from "../types/NoteTypes"
import type { ProjectType } from "../types/ProjectTypes"
import type { TaskType } from "../types/TaskTypes"
import { ErrorResponseSchema } from "../schemas/GeneralSchema"
import { createNoteSchemaResponse, deleteNoteByIdSchemaResponse, getNotesByTaskSchemaResponse } from "../schemas/NoteSchema"
import type { ErrorResponseType } from "../types/GeneralTypes"
import clienteAxios from "../config/axios"

type NoteApi = {
    dataForm: FormNoteType,
    projectId: ProjectType['_id'],
    taskId: TaskType['_id'],
    noteId: NoteType['_id']
}

const respuestaError: ErrorResponseType = {
    errorTypado: 'Hubo un error al procesar la información',
    errorConexión: 'Error de conexión, revisar su conexión a internet'
};

export async function crearNota({projectId, dataForm, taskId} : Pick<NoteApi, 'projectId' | 'dataForm' | 'taskId'>) : Promise<CreateNoteResponseType>{

    const url = `/projects/${projectId}/tasks/${taskId}/notes`;
   
    try {
        
        const {data} = await clienteAxios.post(url, dataForm);

        const result = createNoteSchemaResponse.safeParse(data);
        
        if(result.success){
            return {
                ok: true,
                msg: result.data.msg,
                data: result.data.data.Note
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

export async function GetNotesByTask({projectId, taskId} : Pick<NoteApi, 'projectId' | 'taskId'>) : Promise<GetNotesByTaskResponseType>{

    const url = `/projects/${projectId}/tasks/${taskId}/notes`;

    try {
        
        const {data} = await clienteAxios.get(url);

        const result = getNotesByTaskSchemaResponse.safeParse(data);

        if(result.success){
            return {
                ok: true,
                msg: result.data.msg,
                data: result.data.data.Notes
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

export async function DeleteNoteById({projectId, taskId, noteId} : Pick<NoteApi, 'projectId' | 'taskId' | 'noteId'>) : Promise<DeleteNoteByIdResponseType>{

    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;

    try {
        
        const {data} = await clienteAxios.delete(url);

        const result = deleteNoteByIdSchemaResponse.safeParse(data);

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