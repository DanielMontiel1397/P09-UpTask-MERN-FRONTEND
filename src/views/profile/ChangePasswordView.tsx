import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import type { ProfileEditPasswordFormType } from "../../types/ProfileTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileEditPasswordFormSchema } from "../../schemas/ProfileSchema";
import { useMutation } from "@tanstack/react-query";
import { editarPassword } from "../../api/ProfileAPI";
import { toast } from "react-toastify";

export default function ChangePasswordView() {
  const initialValues: ProfileEditPasswordFormType = {
    actualPassword: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(ProfileEditPasswordFormSchema)
  })

  const { mutate } = useMutation({
    mutationFn: editarPassword,
    onSuccess: response => {
      toast.success(response.msg);
      reset();
    },
    onError: error => {
      toast.error(error.message);
      reset();
    }
  })

  const handleChangePassword = (formData: ProfileEditPasswordFormType) => {
    mutate({
      dataFormPassword: formData
    })
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Utiliza este formulario para cambiar tu password</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >Password Actual</label>
            <input
              id="actualPasword"
              type="password"
              placeholder="Password Actual"
              className="w-full p-3  border border-gray-200"
              {...register("actualPassword")}
            />
            {errors.actualPassword && (
              <ErrorMessage>{errors.actualPassword.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="password"
            >Nuevo Password</label>
            <input
              id="password"
              type="password"
              placeholder="Nuevo Password"
              className="w-full p-3  border border-gray-200"
              {...register("password")}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >Repetir Password</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="w-full p-3  border border-gray-200"
              {...register("password_confirmation")}
            />
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Cambiar Password'
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}