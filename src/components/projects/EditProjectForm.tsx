import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import type { CreateProjectType, EditProjectResponseType, ProjectDetailsType } from "../../types/ProjectTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProject } from "../../api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    project: ProjectDetailsType,
    projectId: string
}

export default function EditProjectForm({project, projectId} : EditProjectFormProps) {

    const navigate = useNavigate()
    const {idProject} = useParams();

    const initialValues: CreateProjectType = {
        projectName: project.projectName,
        clientName: project.clientName,
        description: project.description
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: editProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response : EditProjectResponseType) => {
            queryClient.invalidateQueries({queryKey: ['projects']});
            queryClient.invalidateQueries({queryKey: ['getProject', idProject]});
            toast.success(response.msg);
            navigate('/');
        }
    })

    const handleForm = (dataForm: CreateProjectType) => {
        const data = {
            dataForm,
            projectId
        }
        mutation.mutate(data)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto</p>

                <nav className="my-5">
                    <Link
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to={'/'}
                    >
                        Volver a Proyectos
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input
                        type="submit"
                        value='Guardar Cambios'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
