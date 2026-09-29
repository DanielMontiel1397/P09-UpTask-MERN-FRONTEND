import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { getTask } from "../../api/TaskAPI";
import EditTaskModal from "./EditTaskModal";
export default function EditTaskData() {

  const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('editTask')!;

    const {idProject} = useParams();

    const {data, isError, isLoading, error} = useQuery({
      queryKey: ['getTask', taskId],
      queryFn:() => getTask({
        projectId: idProject || '',
        taskId: taskId
      }),
      enabled: !!taskId,
      retry: false
    })

    if (isLoading) return 'Cargando...'

    if (isError) {
        toast.error(error.message);
        return <Navigate to={'/404'}/> 
    }

  if(data) return (
    <EditTaskModal
      data={data.task}
    />
  )
}
