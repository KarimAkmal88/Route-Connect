import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl min-w-0 px-3 py-6 sm:px-6 sm:py-10">
        <Outlet />
      </main>
      <footer className="px-4 pb-6 text-center text-xs text-text-secondary">Route Connect · Independent student project. Not an official Route Academy product.</footer>
    </div>
  )
}
