import type z from "zod";
import type { CheckPasswordFormSchema, ConfirmTokenFormShema, ForgotPasswordFormSchema, LoginFormSchema, NewPasswordFormSchema, NewTokenFormSchema, RegisterFormSchema, UserSchemaResponse } from "../schemas/AuthSchema";


export type LoginUserFormType = z.infer<typeof LoginFormSchema>;
export type RegisterUserFormType = z.infer<typeof RegisterFormSchema>;

//Crear Usuario
export type RegisterUserResponseType = {
    ok: true,
    msg: string
}

//Confirmar Cuenta
export type ConfirmTokenFormType = z.infer<typeof ConfirmTokenFormShema>

export type ConfirmEmailResponseType = {
    ok: true,
    msg: string
}


//Nuevo codigo de verificación
export type NewTokenFormType = z.infer<typeof NewTokenFormSchema>

export type NewTokenResponseType = {
    ok: true,
    msg: string
}

//Login
export type LoginUserResponseType = {
    ok: true,
    msg: string,
    token: string
}

//OLVIDAR PASSWROD
export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordFormSchema>

export type GenerateCodeForgotPasswordResponseType = {
    ok: true,
    msg: string
}

///CONFIRMAR CODIGO PARA REESTABLECER PASSWORD
export type CodeResetPasswordResponseType = {
    ok: true,
    msg: string
}

//Reestablecer password
export type NewPasswordFormType = z.infer<typeof NewPasswordFormSchema>

export type ResetPasswordDataType = {
    data: NewPasswordFormType,
    token: string
}

//OBTENER USUARIO
export type UserType = z.infer<typeof UserSchemaResponse>;

export type GetUserResponseType = {
    ok: true,
    msg: string,
    data: UserType
}


//////REVISAR CONTRASEÑA
export type CheckPasswordFormType = z.infer<typeof CheckPasswordFormSchema>

export type CheckPasswordResponseType = {
    ok: true,
    msg: string
}