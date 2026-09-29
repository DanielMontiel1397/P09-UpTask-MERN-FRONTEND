import z from "zod";
import { UserSchemaResponse } from "./AuthSchema";

export const MembersFormSchema = z.object({
    email: z
            .email("Email no válido")
})

export const SearchMemberSchemaResponse = z.object({
    data: z.object({
        user: UserSchemaResponse
    }),
    msg: z.string()
})

///AGREGAR MIEMBRO AL EQUIPO DEL PROYECTO
export const AddMemberSchemaResponse = z.object({
    msg: z.string()
})

///OBTENER MIEMBROS DEL EQUIPO DEL PROYECTO
export const GetMembersSchemaResponse = z.object({
    data: z.object({
        Members: z.array(UserSchemaResponse)
    }),
    msg: z.string()
})

///REMOVER MIEMBRO DEL EQUIPO DEL PROYECTO
export const DeleteMemberSchemaResponse = z.object({
    msg: z.string()
})