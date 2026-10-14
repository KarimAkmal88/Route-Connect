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
    <div className="flex items-center justify-center">
      <Form className="w-full max-w-md grid gap-5 bg-surface m-auto text-text-primary border border-border rounded-2xl p-5 sm:p-8" onSubmit={handleSubmit(signIn)}>
        <div className="mb-1"><h1 className="text-2xl font-bold tracking-tight">Welcome back</h1><p className="mt-1 text-sm text-text-secondary">Sign in to catch up with your community.</p></div>
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
        <div className="grid grid-cols-2 gap-3 mt-2">
          <Button isLoading={isLoading} color="primary" type="submit" className="min-h-11 rounded-lg">
            Sign In
          </Button>
          <Button className="min-h-11 rounded-lg" onClick={() => reset()}>
            Reset
          </Button>
        </div>
        <p className="text-sm text-text-secondary">Don't have an account? <Link className="text-secondary font-semibold hover:underline" to={'/signup'}>Register now</Link></p>
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
