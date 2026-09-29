import axios from "axios";
import clienteAxios from "../config/axios";
import type { CheckPasswordFormType, CheckPasswordResponseType, CodeResetPasswordResponseType, ConfirmEmailResponseType, ConfirmTokenFormType, ForgotPasswordFormType, GenerateCodeForgotPasswordResponseType, GetUserResponseType, LoginUserFormType, LoginUserResponseType, NewTokenFormType, NewTokenResponseType, RegisterUserFormType, RegisterUserResponseType, ResetPasswordDataType } from "../types/AuthTypes";
import type { ErrorResponseType } from "../types/GeneralTypes";
import { ErrorResponseSchema } from "../schemas/GeneralSchema";
import { CheckPasswordSchemaResponse, CodeResetPasswordSchemaResponse, ConfirmEmailSchemaResponse, GenerateCodeForgotPasswordSchemaResponse, GetUserSchemaResponse, LoginUserSchemaResponse, NewTokenFormSchemaResponse, RegisterUserSchemaResponse, ResetPasswordSchemaResponse } from "../schemas/AuthSchema";

type AuthAPI = {
    password: CheckPasswordFormType
}

const respuestaError: ErrorResponseType = {
    errorTypado: 'Error de conexión, revisar su conexión a internet',
    errorConexión: 'Error de conexión'
};

export async function loginUser(dataForm: LoginUserFormType): Promise<LoginUserResponseType> {

    try {

        const { data } = await clienteAxios.post('/auth/login', dataForm);

        const result = LoginUserSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                msg: result.data.msg,
                token: result.data.token
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

export async function registerUser(dataForm: RegisterUserFormType): Promise<RegisterUserResponseType> {
    try {

        const { data } = await clienteAxios.post('/auth/create', dataForm);

        const result = RegisterUserSchemaResponse.safeParse(data);

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

export async function confirmEmail(dataForm: ConfirmTokenFormType): Promise<ConfirmEmailResponseType> {

    const url = `/auth/confirmar-cuenta`;

    try {

        const { data } = await clienteAxios.post(url, dataForm);

        const result = ConfirmEmailSchemaResponse.safeParse(data);

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

export async function sendNewCode(dataForm: NewTokenFormType): Promise<NewTokenResponseType> {

    const url = `/auth/request-code`;

    try {

        const { data } = await clienteAxios.post(url, dataForm);

        const result = NewTokenFormSchemaResponse.safeParse(data);

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

export async function generateCodeForgotPassword(dataForm: ForgotPasswordFormType): Promise<GenerateCodeForgotPasswordResponseType> {

    const url = `/auth/forgot-password`;

    try {

        const { data } = await clienteAxios.post(url, dataForm);

        const result = GenerateCodeForgotPasswordSchemaResponse.safeParse(data);

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

export async function confirmCodeResetPassword(dataForm: ConfirmTokenFormType): Promise<CodeResetPasswordResponseType> {

    const url = `/auth/confirm-code`;

    try {

        const { data } = await clienteAxios.post(url, dataForm);

        const result = CodeResetPasswordSchemaResponse.safeParse(data);

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

export async function resetPassword(dataForm: ResetPasswordDataType) {

    const url = `/auth/update-password/${dataForm.token}`;

    try {

        const { data } = await clienteAxios.post(url, dataForm.data);

        const result = ResetPasswordSchemaResponse.safeParse(data);

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

export async function getUser(): Promise<GetUserResponseType> {

    const url = `/auth/user`;

    try {

        const { data } = await clienteAxios.get(url);

        const result = GetUserSchemaResponse.safeParse(data);

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

export async function checkPassword({password}: Pick<AuthAPI, 'password'>) : Promise<CheckPasswordResponseType> {
    const url = `/auth/check-password`;

    try {

        const { data } = await clienteAxios.post(url, password);

        const result = CheckPasswordSchemaResponse.safeParse(data);

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