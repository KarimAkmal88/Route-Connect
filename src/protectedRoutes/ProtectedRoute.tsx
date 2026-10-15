import { type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "@heroui/react";

export default function ProtectedRoute({ children, }: { children: ReactElement; }) {

  const { isLoggedIn, isLoading } = useAuth()

  return (
    <>
      {
        isLoading ? <div className="flex items-center justify-center p-4 text-primary text-4xl"><Spinner/></div> :
          isLoggedIn ? children : <Navigate to={'/signin'} />
      }
    </>
  )
}
