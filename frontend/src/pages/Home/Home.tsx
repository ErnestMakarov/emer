import { NavLink } from "react-router/internal/react-server-client";

export default function Home() {
  return (
    <section className="ml-20 flex flex-col justify-center h-[calc(100vh-160px)] gap-4">

      <p className="flex bg-gray-900 text-white w-50 p-4 rounded-3xl items-center justify-center opacity-75">Your tasks, your goals</p>
      <h1 className="text-5xl font-bold">Plan your life, <br/>
       <span className="text-blue-300">one task at a time</span>
      </h1>
      <p className="max-w-md mt-4 opacity-75">A simple and powerful planner to help you stay focused, get things done and reach your goals.</p>
      <NavLink to='/' className="bg-blue-400 text-white font-bold w-40 h-10 rounded-xl flex items-center justify-center hover:transform hover:scale-105">
        Get Started
      </NavLink>
   

    </section>
  )
}
