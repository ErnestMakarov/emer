import { NavLink } from "react-router/internal/react-server-client";
import HomeImage from '../../assets/home-demo-img.png'

export default function Home() {
  return (
    <section className="p-5 md:ml-20 flex md:justify-between md:h-[calc(100vh-200px)] gap-4 flex-row flex-wrap items-center justify-center">
      <div className="flex flex-col justify-center gap-4 max-w-lg">
        <p className="flex bg-gray-900 text-white w-50 p-4 rounded-3xl items-center justify-center opacity-75">Your tasks, your goals</p>
        <h1 className="text-5xl font-bold">Plan your life, <br/>
        <span className="text-cyan-200">one task at a time</span>
        </h1>
        <p className="max-w-md mt-2 opacity-75">A simple and powerful planner to help you stay focused, get things done and reach your goals.</p>
        <NavLink to='/workspace/main' className="mt-5 bg-linear-to-r from-cyan-600 to-blue-800 text-white font-bold w-40 h-10 rounded-tr-xl rounded-bl-xl flex items-center justify-center hover:transform hover:scale-105 animate-bounce duration-800 rotate-3">
          Get Started
        </NavLink>
      </div>

      <img src={HomeImage} alt="home demo" className="md:w-200 rotate-3 mt-4 rounded-xl shadow-lg shadow-blue-500/50" />
   

    </section>
  )
}
