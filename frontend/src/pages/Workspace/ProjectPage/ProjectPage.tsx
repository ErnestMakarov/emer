import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router'
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

  return (
    <section className="p-5">
      <Link to="/workspace/main" className="flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <GoArrowLeft /> Back to projects
      </Link>

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
  )
}
