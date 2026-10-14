import { Outlet } from 'react-router'

import { NavLink } from 'react-router'

import { IoHome } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";


export default function WorkspaceLayout() {
  return (
    <div>
        <header className="h-20 flex justify-between items-center p-4 bg-[#030A18] backdrop-blur-3xl opacity-95 text-white">
            <img src="/logo.png" alt="Logo" className='h-19' />
            <nav className='md:flex hidden gap-8 text-lg font-bold items-center'> 
                <NavLink to='/workspace/main'>Main</NavLink>
                <NavLink to="/workspace/todo">Projects</NavLink>
                <NavLink to="/workspace/settings">Settings</NavLink>
            </nav>
            <CgProfile className='text-3xl ml-4' />
        </header>
        <main>
            <Outlet />
        </main>
     <nav className='fixed inset-x-0 bottom-5 z-40 md:hidden'>
        <div className='flex justify-around items-center bg-[#0C1223] backdrop-blur-3xl opacity-95 text-white h-16 w-[90%] mx-auto rounded-2xl border border-gray-800'>
            <NavLink to="/workspace/main" className='flex flex-col items-center gap-1'>
                <IoHome className='text-xl' />
                <span className='text-sm'>Main</span>
            </NavLink>
            <NavLink to="/workspace/todo" className='flex flex-col items-center gap-1'>
                <FaCalendarAlt className='text-xl' />
                <span className='text-sm'>Calendar</span>
            </NavLink>
            <NavLink to="/workspace/settings" className='flex flex-col items-center gap-1'>
                <IoSettingsSharp className='text-xl' />
                <span className='text-sm'>Settings</span>
            </NavLink>
            <NavLink to="/workspace/profile" className='flex flex-col items-center gap-1'>
                <CgProfile className='text-xl' />
                <span className='text-sm'>Profile</span>

            </NavLink>
        </div>
      </nav>
    </div>
  )
}
