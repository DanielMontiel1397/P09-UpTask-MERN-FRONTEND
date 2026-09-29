import axios from "axios";
import { ErrorResponseSchema } from "../schemas/GeneralSchema";
import type { EditProfileResponseType, ProfileEditPasswordFormType, ProfileEditPasswordResponseType, ProfileFormType } from "../types/ProfileTypes";
import clienteAxios from "../config/axios";
import type { ErrorResponseType } from "../types/GeneralTypes";
import { EditProfilePasswordSchemaResponse, EditProfileSchemaResponse } from "../schemas/ProfileSchema";

type ProfileAPI = {
    dataForm: ProfileFormType,
    dataFormPassword: ProfileEditPasswordFormType
}

const respuestaError: ErrorResponseType = {
    errorTypado: 'Hubo un error al procesar la información',
    errorConexión: 'Error de conexión, revisar su conexión a internet'
};

export async function editarPerfil({dataForm} : Pick<ProfileAPI, 'dataForm'>) : Promise<EditProfileResponseType> {
    const url = `/profile/editProfile`;

    try {
        
        const {data} = await clienteAxios.put(url, dataForm);

        const result = EditProfileSchemaResponse.safeParse(data);
        console.log(result);
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

export async function editarPassword({dataFormPassword} : Pick<ProfileAPI, 'dataFormPassword'>) : Promise<ProfileEditPasswordResponseType> {
    const url = `/profile/editPassword`;

    try {
        
        const {data} = await clienteAxios.put(url, dataFormPassword);

        const result = EditProfilePasswordSchemaResponse.safeParse(data);

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