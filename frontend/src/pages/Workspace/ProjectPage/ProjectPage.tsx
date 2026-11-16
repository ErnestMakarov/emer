import { useParams } from "react-router"
import { useEffect, useState } from "react"

type Project = {
  id: string
  name: string
  description: string
}

type Task = {
  id: number
  title: string
  status: "todo" | "inProgress" | "done"
}

export default function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetch(`https://emer-ba4t.onrender.com/projects/${id}`)
      .then(response => {
        if(!response.ok) {
          throw new Error('Failed to load project')
        }
        return response.json()
      })
      .then(data => setProject(data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
      const controller = new AbortController()

      fetch(`https://emer-ba4t.onrender.com/projects/${id}/tasks`, {
         signal: controller.signal 
      })
      .then(response => {
        if(!response.ok) {
          throw new Error('Failed to load tasks')
        }
        return response.json()
      })
      .then(data => setTasks(data))
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error(error)
        }
      })
      
      return () => controller.abort()
    }, [id])
        

    if (loading) {
      return <p className="p-5 text-white">Loading project...</p>
    }

    if (!project) {
      return <p className="p-5 text-white">Project not found</p>
    }

  return (
    <section className="p-5">
      <h2 className="text-2xl font-bold">{project.name}</h2>
      <p className="mt-2 text-gray-400">{project.description}</p>

      <div className="mt-6 flex flex-col gap-3">
        {tasks.map(task => (
          <div key={task.id} className='rounded-xl border border-white/20 bg-sky-500/10 p-4'>
            <h3 className="font-bold">{task.title}</h3>
            <p className="mt-1 text-sm text-gray-400">Status: {task.status}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
