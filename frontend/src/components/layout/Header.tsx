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
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <p className="text-lg font-bold">Ernest</p>
        <div className="flex gap-4">
            <p className="underline">log in</p>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
              aria-expanded={isMenuOpen}
              onClick={HandleMenuToggle}
            >
              {isMenuOpen ? (
                <span className="z-41 text-4xl font-light leading-none">X</span>
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
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-800 text-white">
        <nav className='flex flex-col items-center gap-8 text-3xl font-bold'>
          <NavLink to='/' onClick={HandleMenuClose}>
            Home
          </NavLink>
          <NavLink to='/todo' onClick={HandleMenuClose}>
            Todo
          </NavLink>
        </nav>
      </div>
    )}
    </>
  )
}
