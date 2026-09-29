import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AddMemberModal from "../../components/projects/team/AddMemberModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMembersTeam, getMembersTeam } from "../../api/TeamAPI";
import { toast } from "react-toastify";

import { Menu, MenuButton, MenuItem, MenuItems, } from '@headlessui/react';
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import type { UserType } from "../../types/AuthTypes";


export default function ProjectTeamView() {

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.idProject!
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: deleteMembersTeam,
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['getMembersTeam', projectId]})
            toast.success(response.msg)
        },
        onError: error => {
            toast.error(error.message)
        }
    })

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['getMembersTeam', projectId],
        queryFn: () => getMembersTeam({ projectId }),
        retry: false
    })

    if (isLoading) return 'Cargando...'

    if (isError) {
        toast.error(error.message);
        <Navigate to='/404' />
    }

    const deleteMemberTeam = (userId : UserType['_id']) => {
        const data = {
            projectId,
            userId
        }
        mutate(data)
    }

    return (
        <>
            <h1 className="text-5xl font-black">Administrar Equipo</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Administra el equipo de trabajo para este proyecto</p>

            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    onClick={() => navigate('?addMember=true')}
                >
                    Agregar Colaborador
                </button>

                <Link
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    to={`/projects/${projectId}`}>
                    Volver a Proyecto
                </Link>
            </nav>

            <h2 className="text-5xl font-black my-10">Miembros actuales</h2>

            {data?.data.length ? (
                <ul
                    role="list"
                    className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
                >
                    {data.data.map((member) => (
                        <li
                            key={member._id}
                            className="flex justify-between gap-x-6 px-5 py-10"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-black text-gray-600">
                                        {member.name}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        {member.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">Opciones</span>
                                        <EllipsisVerticalIcon
                                            className="h-9 w-9"
                                            aria-hidden="true"
                                        />
                                    </MenuButton>

                                    <MenuItems
                                        transition
                                        anchor="bottom end"
                                        className="w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
                                    >
                                        <MenuItem>
                                            <button
                                                type="button"
                                                className="block w-full px-3 py-1 text-left text-sm leading-6 text-red-500 data-focus:bg-gray-50"
                                                onClick={() => deleteMemberTeam(member._id)}
                                            >
                                                Eliminar del Proyecto
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center py-20">
                    No hay miembros en este equipo
                </p>
            )}

            <AddMemberModal />
        </>
    )
}
