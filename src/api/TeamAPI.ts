import axios from "axios";
import clienteAxios from "../config/axios";
import { ErrorResponseSchema } from "../schemas/GeneralSchema";
import type { ErrorResponseType } from "../types/GeneralTypes";
import type { ProjectType } from "../types/ProjectTypes";
import type { AddMemberResponseType, DeleteMemberResponseType, GetMembersResponseType, MemberFormType, SearchMemberResponseType } from "../types/TeamTypes";
import { AddMemberSchemaResponse, DeleteMemberSchemaResponse, GetMembersSchemaResponse, SearchMemberSchemaResponse } from "../schemas/TeamSchema";
import type { UserType } from "../types/AuthTypes";

type TeamApi = {
    dataForm: MemberFormType,
    projectId: ProjectType['_id'],
    userId: UserType['_id']
}

const respuestaError: ErrorResponseType = {
    errorTypado: 'Hubo un error al procesar la información',
    errorConexión: 'Error de conexión, revisar su conexión a internet'
};

export async function searchMember({dataForm, projectId} : Pick<TeamApi, 'dataForm' | 'projectId'>) : Promise<SearchMemberResponseType> {

    const url = `/projects/${projectId}/team/find`;

    try {

        const { data } = await clienteAxios.post(url, dataForm);

        const result = SearchMemberSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                msg: result.data.msg,
                data: result.data.data.user
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

export async function addMemberTeam({userId, projectId} : Pick<TeamApi, 'userId' | 'projectId'>) : Promise<AddMemberResponseType>{

    const url = `/projects/${projectId}/team`;

    try {

        const { data } = await clienteAxios.post(url, {id: userId});

        const result = AddMemberSchemaResponse.safeParse(data);
     
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

export async function deleteMembersTeam({userId, projectId} : Pick<TeamApi, 'userId' | 'projectId'>) : Promise<DeleteMemberResponseType>{

    const url = `/projects/${projectId}/team/${userId}`;
   
    try {

        const { data } = await clienteAxios.delete(url);

        const result = DeleteMemberSchemaResponse.safeParse(data);
     
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
export async function getMembersTeam({projectId} : Pick<TeamApi, 'projectId'>) : Promise<GetMembersResponseType>{

    const url = `/projects/${projectId}/team`;

    try {

        const { data } = await clienteAxios.get(url);

        const result = GetMembersSchemaResponse.safeParse(data);
     
        if (result.success) {

            return {
                ok: true,
                msg: result.data.msg,
                data: result.data.data.Members
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