import { Outlet } from "react-router-dom";


export default function AuthLayout() {
  return (
    <div className="min-h-screen px-4 py-8 sm:py-12">
      <header className="mx-auto mb-8 max-w-md text-center">
        <p className="text-3xl font-bold tracking-tight">Route <span className="text-secondary">Connect</span></p>
        <p className="mt-2 text-sm text-text-secondary">A space to learn, share, and stay connected.</p>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mx-auto mt-8 max-w-md text-center text-xs text-text-secondary">An independent student project for the Route community.<br />Not an official Route Academy product.</footer>
    </div>
  )
}
