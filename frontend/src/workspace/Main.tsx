


export default function Main() {

  return (
    <section className='p-5'>
        <div>
            <p className="text-gray-500">Today is {new Date().toLocaleDateString('ru-RU')}</p>
            <h3 className="font-bold text-xl">Lets do something to <br /> improve the day</h3>
        </div>
        <input type="text" placeholder="Find tasks..." className='mt-4 w-full p-2 bg-[#0C1223] rounded-xl text-gray-500 placeholder:text-gray-500 border border-gray-800 '/>
        <button className="mt-4 bg-linear-to-r from-cyan-600 to-blue-800 text-white px-5 py-2 font-bold cursor-pointer rounded-xl">Add new Project</button>
    </section>
  )
}
