import { useParams } from "react-router"
import { useEffect, useState } from "react"

type Project = {
  id: string
  name: string
  description: string
  status: string
}

export default function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3000/projects/${id}`)
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
      <p className="mt-4">Status: {project.status}</p>
      <p className="mt-2 text-xs text-gray-500">ID: {project.id}</p>
    </section>
  )
}
