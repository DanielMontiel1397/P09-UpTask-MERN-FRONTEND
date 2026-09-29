import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { confirmCodeResetPassword } from '../../api/AuthAPI';
import { toast } from 'react-toastify';


type NewPasswordTokenProps = {
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>,
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken} : NewPasswordTokenProps) {


  const handleChange = (token: string) => {
    setToken(token)
  }

  const {mutate} = useMutation({
    mutationFn: confirmCodeResetPassword,
    onError: (error) => {
      toast.error(error.message)
      setToken('');
    },
    onSuccess: (data) => {
      if(data.ok){
        setIsValidToken(true);
        toast.success(data.msg)
      }
    }
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(token.length === 6 ){
      mutate({token})
    }
  }

  return (
    <>
      
        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-10 bg-white mt-10"
        >
          <label
            className="font-normal text-2xl text-center block"
          >Código de 6 dígitos</label>

          <div className="flex justify-center gap-5">
            <PinInput value={token} onChange={handleChange}>
              <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            </PinInput>
          </div>

          <button
            type="submit"
            disabled={token.length !== 6}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition"
          >
            Verificar Código
          </button>

        </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/nuevo-codigo'
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>

    </>
  )
}