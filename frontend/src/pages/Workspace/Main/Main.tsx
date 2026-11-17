import { useState, useEffect} from 'react'
import { Link } from 'react-router'
import { CiSearch } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";

    type Project = {
      id: string;
      name: string;
      description: string;
    };

export default function Main() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
      const controller = new AbortController();
      
      async function loadProjects() {
        try {
          const response  = await fetch(
            'https://emer-ba4t.onrender.com/projects',
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error('Failed to load projects');
          }

          const data: Project[] = await response.json();
          setProjects(data);
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Failed to load projects:', error);
            setError(error.message)
          }
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }
      }

      loadProjects();
      
      return () => controller.abort();
  
    }, []);
    
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    function handleMenuToggle() {
        setIsOpen((previousValue) => !previousValue)
    }

    function handleMenuClose() {
        setIsOpen(false)
    }

  async function handleCreateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!projectName.trim()) return;

    try {
      const response = await fetch('https://emer-ba4t.onrender.com/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName.trim(),
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const newProject: Project = await response.json();

      setProjects(previous => [...previous, newProject]);
      setProjectName('');
      setDescription('');
      handleMenuClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  }

  return (
    <>
        <section className='p-5'>
            <div>
                <div className="flex justify-between text-gray-300">
                  <p>Hi, Ernest!</p>
                  <p className="text-gray-300">{new Date().toLocaleDateString('ru-RU')}</p>
                </div>
                <h3 className="mt-1 font-bold text-2xl">Your Workspace</h3>
            </div>
            <div className="relative">
                <CiSearch className="absolute left-3 top-6 text-2xl font-bold" />
                <input type="text" placeholder="Search projects..." className='mt-4 w-full px-10 py-2 bg-black/10 rounded-xl text-white placeholder:text-gray-500 border border-gray-400  '/>
            </div>
            <div className="flex justify-between mt-4">
                <h3 className="mt-4 font-bold text-xl">Your Projects</h3>
                <button onClick={handleMenuToggle} className="mt-4 bg-linear-to-r from-cyan-500 to-blue-500/20 text-white px-5 py-2 font-bold cursor-pointer rounded-xl">New project</button>
            </div>
        </section>
        
        <section className="px-5 pb-24">
          {error && <p className="mb-3 text-red-400">{error}</p>}
          {loading ? (
            <p className="text-white">Loading projects...</p>
          ) : (
            <div className="flex flex-col gap-3">
              {projects.map(project => (
                <Link to={`/workspace/projects/${project.id}`}
                  key={project.id}
                  className="rounded-xl border border-gray-500 bg-sky-500/10 p-4"
                >
                  <div className="flex justify-between">
                    <h4 className="font-bold text-white">
                    {project.name}
                    </h4>
                    <GoArrowUpRight className="text-2xl" />
                  </div>

                  <p className="mt-1 text-sm text-gray-300">
                    {project.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>


        {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <form onSubmit={handleCreateProject} className="w-[90%] h-auto max-h-[90vh] rounded-lg bg-black/90 p-6 shadow-xl text-white border border-gray-800">
          <div className="flex justify-between">
            <h3 className='font-bold text-xl'>Add new project</h3>
            <button type="button" className='font-bold text-xl' onClick={handleMenuClose}>x</button>
          </div>
          <p className='mt-4'>Project name</p>
          <input 
            value={projectName} 
            onChange={e => setProjectName(e.target.value)} 
            className='mt-2 w-full p-2 bg-[#0C1223] rounded-xl text-white placeholder:text-gray-500 border border-gray-800 ' 
            type="text" 
            placeholder='Name...' />

          <p className='mt-4'>Project description</p>
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className='mt-2 w-full p-2 bg-[#0C1223] rounded-xl text-white placeholder:text-gray-500 border border-gray-800 '
            placeholder='Description...' 
          />

          <button 
            type='submit' 
            className='w-full mt-10 bg-linear-to-r from-cyan-600 to-blue-800 text-white px-5 py-2 font-bold cursor-pointer rounded-tr-xl rounded-bl-xl'>
            Save
          </button>
        </form>
      </div>
    )}
    </>
  )
}
