import { Outlet } from 'react-router'

import { IoHome } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

export default function WorkspaceLayout() {
  return (
    <div>
        <header className="hidden md:block">
            <h1>Workspace</h1>
        </header>
        <main>
            <Outlet />
        </main>
     <nav className='fixed inset-x-0 bottom-5 z-40 md:hidden'>
        <div className='flex justify-around items-center bg-[#0C1223] backdrop-blur-3xl opacity-95 text-white h-20 w-[90%] mx-auto rounded-3xl border border-gray-800'>
          <a href="/workspace/todo" className='flex flex-col items-center gap-1'>
            <IoHome className='text-xl' />
            <span className='text-sm'>Projects</span>
          </a>
          <a href="/workspace/settings" className='flex flex-col items-center gap-1'>
            <IoSettingsSharp className='text-xl' />
            <span className='text-sm'>Settings</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
