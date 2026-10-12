import { useState } from 'react'


export default function Main() {

    const [isOpen, setIsOpen] = useState(false);

    function handleMenuToggle() {
        setIsOpen((previousValue) => !previousValue)
    }

    function handleMenuClose() {
        setIsOpen(false)
    }

  return (
    <>
        <section className='p-5'>
            <div>
                <p className="text-gray-500">Today is {new Date().toLocaleDateString('ru-RU')}</p>
                <h3 className="font-bold text-xl">Lets do something to <br /> improve the day</h3>
            </div>
            <input type="text" placeholder="Find tasks..." className='mt-4 w-full p-2 bg-[#0C1223] rounded-xl text-gray-500 placeholder:text-gray-500 border border-gray-800 '/>
            <button onClick={handleMenuToggle} className="mt-4 bg-linear-to-r from-cyan-600 to-blue-800 text-white px-5 py-2 font-bold cursor-pointer rounded-xl">Add new Project</button>
        </section>

        {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-[90%] h-auto max-h-[90vh] rounded-lg bg-[#0C1223] p-6 shadow-xl text-white border border-gray-800">
          <div className="flex justify-between">
            <h3 className='font-bold text-xl'>Add new project</h3>
            <button className='font-bold text-xl' onClick={handleMenuClose}>x</button>
          </div>
          <p className='mt-4'>Project name</p>
          <input className='mt-2 w-full p-2 bg-[#0C1223] rounded-xl text-white placeholder:text-gray-500 border border-gray-800 ' type="text" placeholder='Name...' />
          <p className='mt-4'>Project description</p>
          <textarea className='mt-2 w-full p-2 bg-[#0C1223] rounded-xl text-white placeholder:text-gray-500 border border-gray-800 ' placeholder='Description...' />
          <button className='w-full mt-4 bg-linear-to-r from-cyan-600 to-blue-800 text-white px-5 py-2 font-bold cursor-pointer rounded-tr-xl rounded-bl-xl'>Save</button>
        </div>
      </div>
    )}
    </>
  )
}
