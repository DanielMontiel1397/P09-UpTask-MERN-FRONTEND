import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom'
import type {  ProjectsType } from '../../types/ProjectTypes'
import type { UserType } from '../../types/AuthTypes'

type ItemProjectProps = {
    data: ProjectsType
    user: UserType
}

export default function ItemProject({ data, user }: ItemProjectProps) {

    const navigate = useNavigate();

    return (
        <>
            <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                {data.map((project) => (

                    <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto space-y-2">
                                <div className='mb-2'>

                                    {
                                        project.manager._id == user._id ?
                                            <p className='font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5'>Manager</p> :
                                            <p className='font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5'>Colaborador</p>
                                    }
                                </div>

                                <Link to={`/projects/${project._id}`}
                                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                                >{project.projectName}</Link>
                                <p className="text-sm text-gray-400">
                                    Cliente: {project.clientName}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {project.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-x-6">
                            <Menu as="div" className="relative flex-none">
                                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                    <span className="sr-only">opciones</span>
                                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                </MenuButton>
                                <Transition as={Fragment} enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">
                                    <MenuItems
                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                    >

                                        <MenuItem>
                                            <Link to={`/projects/${project._id}`}
                                                className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                Ver Proyecto
                                            </Link>
                                        </MenuItem>

                                        {project.manager._id === user._id && (
                                            <>
                                                <MenuItem>
                                                    <Link to={`/projects/edit/${project._id.toString()}`}
                                                        className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                        Editar Proyecto
                                                    </Link>
                                                </MenuItem>

                                                <MenuItem>
                                                    <button
                                                        type='button'
                                                        className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                        onClick={() => { navigate(location.pathname + `?deleteProject=${project._id}`) }}
                                                    >
                                                        Eliminar Proyecto
                                                    </button>
                                                </MenuItem>
                                            </>
                                        )}


                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}


