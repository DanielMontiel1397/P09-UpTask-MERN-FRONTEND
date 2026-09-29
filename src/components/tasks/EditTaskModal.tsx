import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { Task, TaskFormDataType } from "../../types/TaskTypes";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "../../api/TaskAPI";
import { toast } from "react-toastify";

type EditTaskModalProps = {
    data: Task
}

export default function EditTaskModal({data} : EditTaskModalProps) {
    
    const navigate = useNavigate()
    const {idProject} = useParams()

    const initialValues : TaskFormDataType = {
            name: data.name,
            description: data.description
        };

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: initialValues
    });

    const queryClient = useQueryClient();
    
    const {mutate} = useMutation({
        mutationFn: editTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['getProject', idProject]});
            queryClient.invalidateQueries({queryKey: ['getTask', data._id]});
            toast.success(response.msg);
            reset();
            navigate(location.pathname, {replace: true})
        }
    })

    const handleEditTask = (dataForm : TaskFormDataType) => {
        const dataEdit = {
            dataForm,
            projectId: idProject || '',
            taskId: data._id
        };

        mutate(dataEdit)
    }
  return (
    <Dialog
      open={true}
      onClose={() => navigate(location.pathname, {replace: true})}
      className="relative z-10 transition duration-300 ease-out data-closed:opacity-0"
    >
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
        <DialogPanel className="w-full max-w-4xl rounded-2xl bg-white p-16 shadow-xl transition duration-300 ease-out data-closed:scale-95 data-closed:opacity-0">
          <DialogTitle
            as="h3"
            className="my-5 text-4xl font-black"
          >
            Editar Tarea
          </DialogTitle>

          <p className="text-xl font-bold">
            Realiza cambios a una tarea en{" "}
            <span className="text-fuchsia-600">este formulario</span>
          </p>

          <form
            className="mt-10 space-y-3"
            onSubmit={handleSubmit(handleEditTask)}
            noValidate
          >
            <TaskForm
                register={register}
                errors={errors}
            />

            <input
              type="submit"
              value="Guardar Tarea"
              className="w-full cursor-pointer bg-fuchsia-600 p-3 text-xl font-black text-white hover:bg-fuchsia-700"
            />
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}