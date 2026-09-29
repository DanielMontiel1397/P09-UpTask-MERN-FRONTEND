import z from "zod";

export const LoginFormSchema = z.object({
    email: z
        .email("Email no válido"),
    password: z
        .string()
        .nonempty("El Password es obligatorio")
        .min(6, "El Password debe tener al menos 6 caracteres"),
});

export const RegisterFormSchema = z
    .object({
        name: z
            .string()
            .nonempty("El Nombre es obligatorio")
            .min(2, "El Nombre debe tener al menos 2 caracteres"),
        email: z
            .email("Email no válido"),
        password: z
            .string()
            .nonempty("La contraseña es obligatoria")
            .min(6, "La contraseña debe tener al menos 6 caracteres"),
        password_confirmation: z.string().nonempty("La confirmación de contraseña es obligatoria"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["password_confirmation"],
    });


/////CREAR CUENTA
export const RegisterUserSchemaResponse = z.object({
    msg: z.string()
})


//CONFIRMAR CUENTA
export const ConfirmTokenFormShema = z.object({
    token: z.string()
})

export const ConfirmEmailSchemaResponse = z.object({
    msg: z.string()
})

//Enviar nuevo codigo de verificación
export const NewTokenFormSchema = z.object({
    email: z.email("Email no válido")
})

export const NewTokenFormSchemaResponse = z.object({
    msg: z.string()
})

//LOGIN
export const LoginUserSchemaResponse = z.object({
    token: z.string(),
    msg: z.string()
})

//Olvidar Password
export const ForgotPasswordFormSchema = z.object({
    email: z.email("Email no válido")
})

export const GenerateCodeForgotPasswordSchemaResponse = z.object({
    msg: z.string()
});

///CODIGO PARA REESTABLECER PASSWORD
export const CodeResetPasswordSchemaResponse = z.object({
    msg: z.string()
})

//Reeestablecer Password
export const NewPasswordFormSchema = z.object({
    password: z
        .string()
        .nonempty("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    password_confirmation: z.string().nonempty("La confirmación de contraseña es obligatoria"),
}).refine((data) => data.password === data.password_confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["password_confirmation"],
    })

export const ResetPasswordSchemaResponse = z.object({
    msg: z.string()
})


///OBTENER USUARIO
export const UserSchemaResponse = z.object({
    _id: z.string(),
    email: z.string(),
    name: z.string()
})

export const GetUserSchemaResponse = z.object({
    valid: z.boolean(),
    data: z.object({
        user: UserSchemaResponse
    }),
    msg: z.string()
});


////REVISAR PASSWORD
export const CheckPasswordFormSchema = z.object({
    password: z
        .string()
        .nonempty("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
})

export const CheckPasswordSchemaResponse = z.object({
    msg: z.string()
})