import { useQuery } from "@tanstack/react-query";
import {  Navigate, useParams } from "react-router-dom";
import { getProject } from "../../api/ProjectAPI";
import { toast } from "react-toastify";
import EditProjectForm from "../../components/projects/EditProjectForm";


export default function EditProjectView() {

    const { idProject } = useParams();

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['getProject', idProject],
        queryFn: () => getProject(idProject || ''),
        retry: false
    })

    if (isLoading) return 'Cargando...'

    if (isError) {
        toast.error(error.message);
        <Navigate to='/404'/> 
    }

    if(data) return <EditProjectForm project={data.data} projectId={idProject || ''}/>
}
