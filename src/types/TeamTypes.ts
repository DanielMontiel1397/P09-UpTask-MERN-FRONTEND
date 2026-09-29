import type z from "zod";
import type { MembersFormSchema } from "../schemas/TeamSchema";
import type { UserType } from "./AuthTypes";

export type MemberFormType = z.infer<typeof MembersFormSchema>

export type SearchMemberResponseType = {
    ok: true,
    msg: string,
    data: UserType
}

//AGREGAR MIEMBRO AL EQUIPO DEL PROYECTO
export type AddMemberResponseType = {
    ok: true,
    msg: string
}

//OBTENER MIEMBROS DEL EQUIPO DEL PROYECTO
export type GetMembersResponseType = {
    ok: true,
    msg: string,
    data: UserType[]
}

//ELIMINAR MIEMBRO DEL EQUIOPO DEL PROYECTO
export type DeleteMemberResponseType = {
    ok: true,
    msg: string
}