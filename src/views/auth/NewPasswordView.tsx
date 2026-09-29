import { useState } from "react"
import NewPasswordToken from "../../components/auth/NewPasswordToken";
import NewPasswordForm from "../../components/auth/NewPasswordForm";

export default function NewPasswordView() {

  const [isValidToken, setIsValidToken] = useState(false);
  const [token, setToken] = useState('');

  return (
    <>

      <h1 className="text-5xl font-black text-white">
        {isValidToken ? 'Reestablece tu Contraseña' : 'Confirma tu Cuenta'}
      </h1>
      <p className="text-2xl font-light text-white mt-5">
        {isValidToken ? 'Llena el formulario para crear tu nueva contraseña' : (
          <>
            Ingresa el código que recibiste {''}
            <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
          </>
        )}
      </p>


      {!isValidToken ?
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        /> :
        <NewPasswordForm 
          token={token}
        />
      }
    </>
  )
}
