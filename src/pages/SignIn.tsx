import { Alert, Button, Form, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { signInSchema, type LoginData } from "../schemas/signInSchema";
import { authServices } from "../services/authService";
import { EyeFilledIcon, EyeSlashFilledIcon } from '../types/Icons';
import { getInputProps } from "../utils/helpers";





export default function SignIn() {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const { initializeSession, logout } = useAuth()

  const { handleSubmit, register, formState: { errors }, reset, } = useForm({ resolver: zodResolver(signInSchema), mode: 'onBlur' });
  async function signIn(data: LoginData) {
    setErrMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      const response = await authServices.signIn(data);
      localStorage.setItem('token', response.data.token);
      await initializeSession();
      setSuccessMsg(response.message);

    } catch (error) {
      if (localStorage.getItem('token')) {
        logout();
      }
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.message);
        if (!error.response?.data.message) {
          setErrMsg('Network error')
        }
      } else {
        setErrMsg('Unexpected error')
      }
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center">
      <Form className="w-full max-w-3xl grid gap-4 bg-surface m-auto text-text-primary border border-text-secondary px-2 rounded-xl p-6" onSubmit={handleSubmit(signIn)}>
        <Input
          {...register('email')}
          {...getInputProps("email", "Email")}
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message as string}
          labelPlacement="outside"
          placeholder="Enter your email"
        />
        <Input classNames={{ innerWrapper: `flex justify-between` }}
          {...register('password')}
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message as string}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-solid outline-transparent"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Password"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          variant="bordered"
        />
        <div className="flex gap-6 items-center justify-center">
          <Button isLoading={isLoading} color="primary" type="submit" className="border border-text-secondary px-2 rounded-xl">
            Sign In
          </Button>
          <Button className="border border-text-secondary px-2 rounded-xl" onClick={() => reset()}>
            Reset
          </Button>
        </div>
        <p className="text-text-primary">Don't have an account? <Link to={'/signup'}>Register now</Link></p>
        {errMsg && (
          <Alert hideIcon color="danger" title={errMsg} variant="faded" classNames={{ base: "py-0 capitalize text-center" }} />
        )}
        {successMsg && (
          <Alert hideIcon color="success" title={successMsg} variant="faded" classNames={{ base: "py-0 capitalize text-center" }} />
        )}
      </Form>
    </div>
  )
}
