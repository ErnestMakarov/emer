import { NavLink } from 'react-router'

export default function Settings() {
  return (
    <section className='p-5'>
      <h3 className='text-xl font-bold'>Settings</h3>
      <p className='mt-4 opacity-75'>This is the settings page. You can customize your preferences and manage your account settings here.</p>

      <p className='mt-4 font-bold'>Theme</p>
      <div className='mt-4 flex gap-4 items-center'>
        <div className="bg-blue-800 w-10 h-10 rounded-sm border border-gray-600"></div>
        <div className="bg-black w-10 h-10 rounded-sm border border-gray-600"></div>
        <div className="bg-white w-10 h-10 rounded-sm border border-gray-600"></div>
      </div>
      
      <NavLink to='/' className='bg-blue-400 text-white font-bold w-40 h-10 rounded-xl flex items-center justify-center hover:transform hover:scale-105 mt-10'>
        Back to home
      </NavLink>
    </section>
  )
}
