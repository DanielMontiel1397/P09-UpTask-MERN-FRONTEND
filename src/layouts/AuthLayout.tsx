import { Navigate, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";


export default function AuthLayout() {

    const { data, isLoading } = useAuth();

    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setShowSpinner(false);
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (isLoading || showSpinner) {
        return <Spinner />;
    }


    if (data) {
        return <Navigate to={'/'} />
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
