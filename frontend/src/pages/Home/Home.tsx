import { NavLink } from "react-router/internal/react-server-client";
import HomeImage from '../../assets/home-demo-img.png'

export default function Home() {
  return (
    <section className="p-5 md:ml-20 flex md:justify-between md:h-[calc(100vh-160px)] gap-4 flex-row flex-wrap items-center justify-center">
      <div className="flex flex-col justify-center gap-4 max-w-lg">
        <p className="flex bg-gray-900 text-white w-50 p-4 rounded-3xl items-center justify-center opacity-75">Your tasks, your goals</p>
        <h1 className="text-5xl font-bold">Plan your life, <br/>
        <span className="text-blue-300">one task at a time</span>
        </h1>
        <p className="max-w-md mt-4 opacity-75">A simple and powerful planner to help you stay focused, get things done and reach your goals.</p>
        <NavLink to='/todo' className="bg-blue-400 text-white font-bold w-40 h-10 rounded-xl flex items-center justify-center hover:transform hover:scale-105">
          Get Started
        </NavLink>
      </div>

      <img src={HomeImage} alt="home demo" className="md:max-w-[700px] rotate-3 mt-8 rounded-xl shadow-lg shadow-blue-500/50" />
   

    </section>
  )
}
