import z from "zod";

export const formNoteSchema = z.object({
    content: z.string().nonempty('La nota tiene que tener contenido')
});

export const noteSchema = z.object({
    content: z.string(),
    createdBy: z.string(),
    task: z.string(),
    _id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export const noteSchemaDetails = noteSchema.extend({
    createdBy: z.object({
        _id: z.string(),
        email: z.string(),
        name: z.string()
    })
})

//CREAR NOTA
export const createNoteSchemaResponse = z.object({
    data: z.object({
        Note: noteSchema
    }),
    msg: z.string()
})

///OBTENER TAREAS DE UNA TAREA
export const getNotesByTaskSchemaResponse = z.object({
    data: z.object({
        Notes: z.array(noteSchema)
    }),
    msg: z.string()
})

//ELIMINAR NOTA
export const deleteNoteByIdSchemaResponse = z.object({
    msg: z.string()
})