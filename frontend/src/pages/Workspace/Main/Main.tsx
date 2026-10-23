import { useState, useEffect} from 'react'
import { Link } from 'react-router'


type ProjectStatus = 'todo' | 'inProgress' | 'done' | '';

    type Project = {
      id: string;
      name: string;
      description: string;
      status: ProjectStatus;
    };

export default function Main() {

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
      fetch('https://emer-ba4t.onrender.com/projects')
        .then(response => response.json())
        .then(data => setProjects(data))
        .catch(error => console.error('Failed to load projects:', error));
    }, []);
    
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<ProjectStatus>('');

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
          status: status || 'todo',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const newProject: Project = await response.json();

      setProjects(previous => [...previous, newProject]);
      setProjectName('');
      setDescription('');
      setStatus('');
      handleMenuClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  }

  return (
    <>
        <section className='p-5'>
            <div>
                <p className="text-gray-500">Today is {new Date().toLocaleDateString('ru-RU')}</p>
                <h3 className="font-bold text-xl">Lets do something to <br /> improve the day</h3>
            </div>
            <input type="text" placeholder="Find tasks..." className='mt-4 w-full p-2 bg-[#0C1223] rounded-xl text-gray-500 placeholder:text-gray-500 border border-gray-800 '/>
            <button onClick={handleMenuToggle} className="mt-4 bg-linear-to-r from-cyan-600 to-blue-800 text-white px-5 py-2 font-bold cursor-pointer rounded-tr-xl rounded-bl-xl">Add new Project</button>
        </section>
        
        <section className="px-5 pb-24">
          <div className="flex flex-col gap-3">
            {projects.map(project => (
              <Link to={`/workspace/projects/${project.id}`}
                key={project.id}
                className="rounded-xl border border-gray-800 bg-[#0C1223] p-4"
              >
                <h3 className="font-bold text-white">
                  {project.name}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {project.description}
                </p>

                <span className="mt-3 float-end inline-block rounded-tl-lg rounded-bl-lg rounded-br-lg bg-cyan-200 px-3 py-1 text-sm text-black font-bold">
                  {project.status || 'No status'}
                </span>
              </Link>
            ))}
          </div>
        </section>


        {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <form onSubmit={handleCreateProject} className="w-[90%] h-auto max-h-[90vh] rounded-lg bg-[#0C1223] p-6 shadow-xl text-white border border-gray-800">
          <div className="flex justify-between">
            <h3 className='font-bold text-xl'>Add new project</h3>
            <button className='font-bold text-xl' onClick={handleMenuClose}>x</button>
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

          <p className='mt-4'>Status</p>
          <div className="flex gap-5 mt-2">
            
            <button
              type='button'
              onClick={() => setStatus('todo')}
              className={`px-5 py-2 border border-gray-800 rounded-xl cursor-pointer ${
                status === 'todo' ? 'bg-cyan-300' : 'hover:bg-cyan-500'
              }`}
            >To do</button>
            <button
              type='button'
              onClick={() => setStatus('inProgress')}
              className={`px-5 py-2 border border-gray-800 rounded-xl cursor-pointer ${
                status === 'inProgress' ? 'bg-cyan-300' : 'hover:bg-cyan-500'
              }`}
            >In progress</button>
            <button
              type='button'
              onClick={() => setStatus('done')}
              className={`px-5 py-2 border border-gray-800 rounded-xl cursor-pointer ${
                status === 'done' ? 'bg-cyan-300' : 'hover:bg-cyan-500'
              }`}
            >Done</button>
          </div>

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
