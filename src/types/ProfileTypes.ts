import type z from "zod";
import type { ProfileEditPasswordFormSchema, ProfileFormSchema } from "../schemas/ProfileSchema";

export type ProfileFormType = z.infer<typeof ProfileFormSchema>

////EDITAR PERFIL
export type EditProfileResponseType = {
    ok: true,
    msg: string
}


///EDITAR PASSWORD
export type ProfileEditPasswordFormType = z.infer<typeof ProfileEditPasswordFormSchema>

export type ProfileEditPasswordResponseType = {
    ok: true,
    msg: string
}