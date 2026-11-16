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
    </section>
  )
}
