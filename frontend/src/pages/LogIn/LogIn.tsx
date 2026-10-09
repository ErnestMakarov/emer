import { NavLink } from 'react-router'

export default function LogIn() {
  return (
    <section className="h-[calc(100vh-260px)]">
        <div className="bg-gray-800 p-4 rounded-xl max-w-[400px] mx-auto mt-20 flex flex-col gap-2">
            <p className="text-white text-center ">Log In</p>
            <p className="text-gray-400 text-center">
                Welcome back! Please enter your details.
            </p>
            <input type="text"  placeholder="Username" className="w-full p-2 rounded-md mt-2" />
            <input type="password"  placeholder="Password" className="w-full p-2 rounded-md mt-2" />
            <NavLink to='/signup' className="text-blue-400 hover:underline text-sm mt-2">
                Don't have an account? Sign Up
            </NavLink>
            <a href="" className="text-blue-400 hover:underline text-sm mt-2">
                Forgot Password?
            </a>
            <button className="bg-blue-400 text-white w-full p-2 rounded-md mt-2 hover:bg-blue-500 cursor-pointer">
                Log In
            </button>
        </div>
    </section>
  )
}
