import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <header id="header" className="bg-[#164F63] shadow-md">
        <div className="container  mx-auto flex items-center justify-between p-4">
          <div id="logo" className="flex items-center">
            <h1 className="text-2xl font-bold">
              <a href="/" className="text-blue-700 flex"> <img src="/logo.svg" alt="effectuall" className="h-8" /></a>
            </h1>
          </div>

          <nav id="nav-menu-container" className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
            <ul className="nav-menu flex space-x-4">
            <li className="menu-active">
                <a href="/about" className=" text-cyan-200 hover:text-cyan-500">About Us</a>
              </li>
            <li className="menu-active">
                <a href="/contact" className=" text-cyan-200 hover:text-cyan-500">Contact Us</a>
              </li>
              
              <li>
                <a href="/dashboard" className=" text-cyan-200 hover:text-cyan-500">Dashboard</a>
              </li>
              <li>
                <a href="/dashboard/scene" className=" text-cyan-200 hover:text-cyan-500">3D Scene</a>
              </li>

              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link to="/sign-in" className=" text-cyan-200 hover:text-cyan-500">Sign In</Link>
              </SignedOut>
            </ul>
          </nav>
          <div id="expandButton" className="md:hidden">
            <button onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main className="bg-slate-50 items-center text-center ">
        <Outlet />

      </main>
    </ClerkProvider>
  )
}