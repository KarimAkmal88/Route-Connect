import React, { useState } from "react";
import { Form, Input, Button, Select, SelectItem, Alert, } from "@heroui/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from '../types/Icons'
import { gender } from '../types/gender'
import { getInputProps } from "../utils/helpers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/signUpSchema";
import type { RegisterData } from "../schemas/signUpSchema"
import { authServices } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {


  const [isVisible, setIsVisible] = React.useState(false);
  const [reIsVisible, setReIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleReVisibility = () => setReIsVisible(!reIsVisible);
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register, formState: { errors }, reset } = useForm({ resolver: zodResolver(signUpSchema), mode: "onBlur" })

  async function signUp(data: RegisterData) {
    setErrMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      const response = await authServices.signUp(data);
      setSuccessMsg(response.message);
      navigate('/signin')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.message);
        if (!error.response?.data.message) {
          setErrMsg('Network error');
        }
      } else {
        setErrMsg('Unexpected error');
      }
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="flex items-center justify-center">
      <Form
        className="w-full max-w-md grid gap-5 bg-surface m-auto text-text-primary border border-border rounded-2xl p-5 sm:p-8" onSubmit={handleSubmit(signUp)}>
        <div className="mb-1"><h1 className="text-2xl font-bold tracking-tight">Join the community</h1><p className="mt-1 text-sm text-text-secondary">Create your account and start connecting.</p></div>
        <Input
          {...register('name')}
          {...getInputProps('text', 'Full Name')}
          isInvalid={!!errors.name?.message}
          errorMessage={errors.name?.message as string}
          labelPlacement="outside"
          placeholder="Enter your name"
        />

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
        <Input classNames={{ innerWrapper: `flex justify-between` }}
          {...register('rePassword')}
          isInvalid={!!errors.rePassword?.message}
          errorMessage={errors.rePassword?.message as string}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-solid outline-transparent"
              type="button"
              onClick={toggleReVisibility}
            >
              {reIsVisible ? (
                <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Confirm Password"
          placeholder="Confirm your password"
          type={reIsVisible ? "text" : "password"}
          variant="bordered"
        />

        <Input
          {...register('dateOfBirth')}
          isInvalid={!!errors.dateOfBirth?.message}
          errorMessage={errors.dateOfBirth?.message as string}
          label="Date of birth"
          labelPlacement="outside"
          name="dateOfBirth"
          type="date"
        />

        <Select classNames={{ listbox: `bg-surface text-text-primary`, trigger: `flex flex-row justify-between`, selectorIcon: `data-[open=true]:rotate-180` }}
          items={gender}
          placeholder="Select your gender"
          {...register('gender')}
        >
          {(gender) => <SelectItem>{gender.label}</SelectItem>}
        </Select>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <Button isLoading={isLoading} color="primary" type="submit" className="min-h-11 rounded-lg">
            Sign Up
          </Button>
          <Button className="min-h-11 rounded-lg" onClick={() => reset()}>
            Reset
          </Button>
        </div>
        <p className="text-sm text-text-secondary">Already have an account? <Link className="text-secondary font-semibold hover:underline" to={'/signin'}>Login now</Link></p>
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
