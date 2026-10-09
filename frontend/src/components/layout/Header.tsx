import { useState } from 'react'
import { NavLink } from 'react-router'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  function HandleMenuToggle() {
    setIsMenuOpen((previousValue) => !previousValue)
  }

  function HandleMenuClose() {
    setIsMenuOpen(false)
  }

  return (
    <>
    <header className="p-4 flex justify-between items-center">
        <NavLink to='/' className="text-lg font-bold">
          <img className='w-40' src="/logo.png" alt="EMER" />
        </NavLink>

        <div className="md:flex gap-8 hidden opacity-50">
          <NavLink to='/' className="hover:underline">
            Home
          </NavLink>
          <NavLink to='/todo' className="hover:underline">
            Todo
          </NavLink>
        </div>
        
        <div className="flex gap-6 items-center">

          <NavLink to='/login' className="md:flex hidden opacity-50 hover:transform hover:scale-105 hover:opacity-100">
            log in
          </NavLink>
          <NavLink to='/signup' className="md:flex hidden bg-white text-[#030A18] w-20 h-10 rounded-xl flex items-center justify-center hover:transform hover:scale-105">
            sign up
          </NavLink>

            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-expanded={isMenuOpen}
              onClick={HandleMenuToggle}
            >
              {isMenuOpen ? (
                <span className="z-41 text-4xl font-light leading-none">x</span>
              ) : (
                <span className="flex flex-col gap-1.5">
                  <span className="h-0.5 w-6 rounded-full bg-gray-300"></span>
                  <span className="h-0.5 w-6 rounded-full bg-gray-300"></span>
                  <span className="h-0.5 w-6 rounded-full bg-gray-300"></span>
                </span>
              )
              }
            </button>
        </div>
    </header>

    {isMenuOpen && (
      <div className="fixed flex-col inset-0 z-40 flex items-center justify-center bg-[#030A18] backdrop-blur-3xl opacity-95 text-white">
        <nav className='flex flex-col items-center gap-8 text-3xl font-bold'>
          <NavLink to='/' onClick={HandleMenuClose}>
            Home
          </NavLink>
          <NavLink to='/todo' onClick={HandleMenuClose}>
            Todo
          </NavLink>
        </nav>
        <nav className='flex gap-8 mt-8 text-lg font-bold items-center mt-30'>
          <NavLink to='/login' onClick={HandleMenuClose}>
            Log In
          </NavLink>
          <NavLink to='/signup' className="bg-white text-[#030A18] w-20 h-10 rounded-xl flex items-center justify-center hover:transform hover:scale-105" onClick={HandleMenuClose}>
            Sign Up
          </NavLink>
        </nav>
      </div>
    )}
    </>
  )
}
