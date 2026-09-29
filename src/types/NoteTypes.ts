import type z from "zod";
import type { formNoteSchema, noteSchema, noteSchemaDetails } from "../schemas/NoteSchema";

export type FormNoteType = z.infer<typeof formNoteSchema>

export type NoteType = z.infer<typeof noteSchema>;

export type NotesType = NoteType[];

export type NoteDetailsType = z.infer<typeof noteSchemaDetails>

export type NotesDetailsType = NoteDetailsType[];

//CREAR NOTA
export type CreateNoteResponseType = {
    ok: true,
    msg: string,
    data: NoteType
}

//OBTENER NOTAS
export type GetNotesByTaskResponseType = {
    ok: true,
    msg: string,
    data: NotesType
}

//ELIMINAR NOTA
export type DeleteNoteByIdResponseType = {
    ok: true,
    msg: string
}