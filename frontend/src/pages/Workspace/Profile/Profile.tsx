import { Link } from 'react-router'
import { GoArrowLeft } from "react-icons/go";

export default function Profile() {
  return (
    <section className="p-4 h-[calc(100vh-200px)] flex flex-col gap-4 items-center text-center justify-center">
      <h2 className="text-2xl font-bold text-white">Profile page is coming soon!</h2>
      <Link to="/workspace/main" className="flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <GoArrowLeft /> Back to projects
      </Link>
    </section>
  )
}
