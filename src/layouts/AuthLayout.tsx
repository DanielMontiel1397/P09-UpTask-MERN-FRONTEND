import { Navigate, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";


export default function AuthLayout() {

    const { data, isError, isLoading } = useAuth();

    if (isLoading) {
        return <Spinner />;
    }


    if (data && !isError && localStorage.getItem('AUTH_TOKEN_UPTASK')) {
        return <Navigate to={'/'} replace />
    }


    return (
        <>
            <div className="bg-gray-800 min-h-screen">
                <div className="py-10 lg:py-20 mx-auto w-[450px] ">
                    <Logo />
                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                draggable
                theme="colored"
            />
        </>
    )
}
