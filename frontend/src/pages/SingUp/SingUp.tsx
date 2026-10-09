import { NavLink } from "react-router";

export default function SingUp() {
  return (
    <section className="h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="shadow-cyan-500/50 bg-[#030A10] p-4 rounded-xl max-w-[400px] mx-auto mt-20 flex flex-col gap-2">
          <img src="/logo.png" alt="EMER" />
            <p className="text-white text-center ">Sign Up</p>
            <p className="text-gray-400 text-center">
                Create your account. Please enter your details.
            </p>
            <p className="text-gray-100">Username</p>
            <input type="text"  placeholder="Enter your username" className="w-full p-2 rounded-md mt-2" />
            <p className="text-gray-100">Email</p>
            <input type="email"  placeholder="Enter your email" className="w-full p-2 rounded-md mt-2" />
            <p className="text-gray-100">Password</p>
            <input type="password"  placeholder="Enter your password" className="w-full p-2 rounded-md mt-2" />
            <button className="bg-blue-400 text-white w-full p-2 rounded-md mt-2 hover:bg-blue-500 cursor-pointer">
                Sign Up
            </button>
            <NavLink to='/login' className="text-blue-400 hover:underline text-sm mt-2">
                Already have an account? Log In
            </NavLink>
        </div>
    </section>
  )
}
