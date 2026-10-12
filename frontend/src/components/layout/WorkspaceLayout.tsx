import { Outlet } from 'react-router'

export default function WorkspaceLayout() {
  return (
    <div>
        <header className="hidden md:block">
            <h1>Workspace</h1>
        </header>
        <main>
            <Outlet />
        </main>
     <nav className='fixed inset-x-0 bottom-0 z-40 md:hidden'>
        mobilee navigation
     </nav>
    </div>
  )
}
