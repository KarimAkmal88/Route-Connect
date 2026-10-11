import AuthLayout from "./layouts/AuthLayout"
import MainLayout from "./layouts/MainLayout"
import Feed from "./pages/Feed"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"


import { HeroUIProvider } from "@heroui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthContextProvider from "./contexts/AuthContextProvider"
import { queryClient } from "./contexts/queryClientProvider"
import NotFound from "./pages/NotFound"
import ProtectedAuthRoute from "./protectedRoutes/ProtectedAuthRoute"
import ProtectedRoute from "./protectedRoutes/ProtectedRoute"
import PostDetails from "./pages/PostDetails"


const router = createBrowserRouter([
  {
    path: '', element: <AuthLayout />, children: [
      { path: 'signup', element: (<ProtectedAuthRoute><SignUp /></ProtectedAuthRoute>) },
      { path: 'signin', element: (<ProtectedAuthRoute><SignIn /></ProtectedAuthRoute>) },
    ],
  },
  {
    path: '', element: <MainLayout />, children: [
      { index: true, element: (<ProtectedRoute><Feed /></ProtectedRoute>) },
      { path: 'profile', element: (<ProtectedRoute><Profile /></ProtectedRoute>) },
      { path: '/posts/:postId', element: (<ProtectedRoute><PostDetails /></ProtectedRoute>) },
    ]
  },
  {
    path: '*', element: <NotFound />
  }
])



export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <HeroUIProvider>
          <RouterProvider router={router}></RouterProvider>
        </HeroUIProvider>
      </AuthContextProvider>
    </QueryClientProvider>

  )
}
