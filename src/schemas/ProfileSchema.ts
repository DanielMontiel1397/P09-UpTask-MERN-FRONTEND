import z from "zod";

export const ProfileFormSchema = z.object({
    name: z
        .string()
        .nonempty("El Nombre es obligatorio")
        .min(2, "El Nombre debe tener al menos 2 caracteres"),
    email: z
        .email("Email no válido")
})

///EDITAR PERFIL
export const EditProfileSchemaResponse = z.object({
    msg: z.string()
});

//EDITAR  PASSWORD
export const ProfileEditPasswordFormSchema = z.object({
    password: z
        .string()
        .nonempty("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    password_confirmation: z.string().nonempty("La confirmación de contraseña es obligatoria"),
    actualPassword: z.string()
        .nonempty("La contraseña actual es obligatoria")
        .min(6, "La contraseña actual debe tener al menos 6 caracteres")
}).refine((data) => data.password === data.password_confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["password_confirmation"],
    });

export const EditProfilePasswordSchemaResponse = z.object({
    msg: z.string()
})