import { Link, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../components/Logo";
import NavMenu from "../components/NavMenu";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export default function AppLayout() {

  const {data, isError, isLoading} = useAuth();

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

  if(isError){
    return <Navigate to={'/auth/login'}/>
  }


  if(data) return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Link to={`/`}>
              <Logo />
            </Link>
          </div>

          <NavMenu 
            user={data.data}
          />
        </div>
      </header>

      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />

      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

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
