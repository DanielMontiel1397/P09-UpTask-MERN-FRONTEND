import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UserType } from "../../../types/AuthTypes"
import { addMemberTeam } from "../../../api/TeamAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type SearchResultProps = {
    user: UserType,
    reset: () => void
}

export default function SearchResult({ user, reset }: SearchResultProps) {

    const params = useParams()
    const projectId = params.idProject!

     const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: addMemberTeam,
        onSuccess: response => {
            queryClient.invalidateQueries({queryKey: ['getMembersTeam', projectId]})
            toast.success(response.msg)
            reset();
        },
        onError: error => {
            toast.error(error.message)
        }
    });

    const handleAddUserToProject = () => {
        const data = {
            userId: user._id,
            projectId
        }

        mutate(data);
    }

    return (
        <>
            <p className="mt-10 text-center-font-bold">Resultado: </p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                    onClick={handleAddUserToProject}
                >
                    Agregar al Proyecto
                </button>
            </div>
        </>
    )
}
