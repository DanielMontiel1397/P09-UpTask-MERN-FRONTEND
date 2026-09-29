import type { NotesDetailsType } from "../../types/NoteTypes";
import type { TaskType } from "../../types/TaskTypes";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
    notes: NotesDetailsType,
    taskId: TaskType['_id']
}


export default function NotesPanel({taskId, notes} : NotesPanelProps) {
    
  return (
    <>
        <AddNoteForm
            taskId={taskId}
        />

        <div className="mt-10 max-h-80 overflow-y-auto divide-y divide-gray-100 pr-2">
            {notes.length ? (
                <>
                    <p className="font-bold text-2xl text-slate-600 my-5"></p>
                    {notes.map(note => <NoteDetail key={note._id} note={note} taskId={taskId}/>)}
                </>
            ) : <p className="text-gray-500 text-center pt-3">No hay notas</p>}
        </div>
    </>
  )
}