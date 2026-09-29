import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams, Link } from "react-router-dom"
import { getProject } from "../../api/ProjectAPI";
import { toast } from "react-toastify";
import AddTaskModal from "../../components/tasks/AddTaskModal";
import TasksList from "../../components/tasks/TasksList";
import EditTaskData from "../../components/tasks/EditTaskData";
import TaskModalDetails from "../../components/tasks/TaskModalDetails";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../helpers/policies";
import { useEffect, useMemo } from "react";


export default function ProjectDetailsView() {

    const { data: user, isLoading: authLoading } = useAuth()

    const navigate = useNavigate();

    const { idProject } = useParams();

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['getProject', idProject],
        queryFn: () => getProject(idProject || ''),
        retry: false
    })

    useEffect(() => {
        if (isError) {
            toast.error(error.message);
            navigate('/404', {replace: true})
        }
    }, [isError, error, navigate])

    const canEdit = useMemo(() => data?.data.manager._id == user?.data._id, [data, user])

    if (isLoading && authLoading) return 'Cargando...'


    if (data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.data.description}</p>

            {isManager(data.data.manager, user.data._id) && (
                <nav className="my-5 flex gap-3">

                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate('?newTask=true')}
                    >
                        Agregar Tarea
                    </button>

                    <Link
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to={'team'}>
                        Colaboradores
                    </Link>

                </nav>
            )}

            <TasksList
                tasks={data.data.tasks}
                canEdit={canEdit}
            />

            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
