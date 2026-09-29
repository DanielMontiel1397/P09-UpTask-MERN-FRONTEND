import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddMemberForm from './AddMemberForm';

export default function AddMemberModal() {

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const addMember = queryParams.get('addMember');

    const show = !!addMember;

    const closeModal = () => {
        navigate(location.pathname, { replace: true });
    };

    return (
        <Dialog
            open={show}
            onClose={closeModal}
            className="relative z-10"
        >
            <div className="fixed inset-0 bg-black/60 transition-opacity data-closed:opacity-0" />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="
                            w-full max-w-4xl
                            transform overflow-hidden
                            rounded-2xl bg-white p-16
                            text-left align-middle shadow-xl
                            transition duration-300 ease-out
                            data-closed:scale-95
                            data-closed:opacity-0
                        "
                    >
                        <DialogTitle
                            as="h3"
                            className="my-5 text-4xl font-black"
                        >
                            Agregar Integrante al equipo
                        </DialogTitle>

                        <p className="text-xl font-bold">
                            Busca el nuevo integrante por email{' '}
                            <span className="text-fuchsia-600">
                                para agregarlo al proyecto
                            </span>
                        </p>

                        <AddMemberForm/>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}