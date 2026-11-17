import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router'
import { GoArrowLeft } from "react-icons/go";

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

  const [taskTitle, setTaskTitle] = useState('')

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const [deleteProjectName, setDeleteProjectName] = useState('')
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

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

    async function handleAddTask() {

      if (!taskTitle.trim()) return;

      try {
        const response = await fetch(`https://emer-ba4t.onrender.com/projects/${id}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: taskTitle.trim()
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add task');
        }

        const newTask: Task = await response.json();
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskTitle('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }

    async function handleDeleteTask(taskId: number) {
      try {
        const response = await fetch(
          `https://emer-ba4t.onrender.com/tasks/${taskId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error ('failed to delete task');
        }
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      }

      async function handleDeleteProject() {
        if (!project || deleteProjectName !== project.name || isDeleting) {
          return
        }
        setIsDeleting(true)
        setDeleteError('')

        try {
          const response = await fetch(
            `https://emer-ba4t.onrender.com/projects/${id}`, 
            {
              method: "DELETE"
            }
          )

          if (!response.ok) {
            throw new Error('Failed to delete project')
          }

          navigate('/workspace/main', { replace: true })
        } catch (error) {
          setDeleteError(error instanceof Error ? error.message : 'Failed to delete project. Please try again.')
        } finally {
          setIsDeleting(false)
        }
      }

      function handleDeleteConfirmation() {
        setDeleteConfirmation(previous => !previous)
        setDeleteProjectName("")
        setDeleteError("")
      }


  return (
    <>
    <section className="p-5">
      <div className="flex justify-between">
        <Link to="/workspace/main" className="flex items-center gap-2 text-sm text-white/50 hover:text-white">
          <GoArrowLeft /> Back to projects
        </Link>
        <button className='text-sm text-white/50 hover:text-white cursor-pointer' onClick={handleDeleteConfirmation}>
          delete
        </button>
      </div>

      <h2 className="mt-2 text-2xl font-bold">{project.name}</h2>
      <p className="mt-2 text-gray-400">{project.description}</p>

      <div className="flex justify-between gap-3">
        <input 
          type="text" 
          value={taskTitle} 
          onChange={e => setTaskTitle(e.target.value)} 
          className="mt-6 w-full rounded-xl border border-white/20 bg-black/10 px-4 py-3 text-white" 
          placeholder="New task..." 
        />
        <button 
          onClick={handleAddTask} 
          className="mt-6 bg-linear-to-r from-cyan-500 to-blue-500/20 text-white px-5 py-2 font-bold cursor-pointer rounded-xl"
        >
          Add
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {tasks.map(task => (
          <div key={task.id} className='rounded-xl flex justify-between border border-white/20 bg-sky-500/10 p-4'>
            <h3 className="font-bold">{task.title}</h3>
            <div className="flex align-baseline gap-2">
              <p className="mt-1 text-sm text-gray-400">{task.status}</p>
              <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDeleteTask(task.id)}>
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {deleteConfirmation && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-[90%] h-auto max-h-[90vh] rounded-lg bg-black/90 p-6 shadow-xl text-white border border-gray-800">
          <h3 className='font-bold text-xl'>Are you sure you want to delete this project?</h3>
          <p className="mt-4 text-gray-300">
            This will delete the project and all its tasks.
            Type "{project.name}" to confirm.
          </p>
          <input 
            type="text"
            value={deleteProjectName}
            onChange={event => setDeleteProjectName(event.target.value)}
            disabled={isDeleting}
            className="mt-4 w-full rounded-xl border border-white/20 bg-black/10 px-4 py-3 text-white" 
            placeholder="Type the project name..." 
          />
          {deleteError && (
            <p role="alert" className="mt-2 text-red-500">{deleteError}</p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button 
              onClick={() => setDeleteConfirmation(false)}
              disabled={isDeleting}
              className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 font-bold cursor-pointer rounded-xl"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteProject}
              disabled={deleteProjectName !== project.name || isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 font-bold cursor-pointer rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
