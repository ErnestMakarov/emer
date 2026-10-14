import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

const STORAGE_KEY = 'todo-tasks'

export default function Todo() {
  const [tasks, setTasks] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved === null) return []

    try {
      const parsed: unknown = JSON.parse(saved)

      if (
        Array.isArray(parsed) &&
        parsed.every((task) => typeof task === 'string')
      ) {
        return parsed
      }
    } catch {
      return []
    }

    return []
  })

  const [taskInput, setTaskInput] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function HandleChange(event: ChangeEvent<HTMLInputElement>) {
    setTaskInput(event.target.value)
  }

  function HandleAdd() {
    const newTask = taskInput.trim()
    if (!newTask) return

    setTasks((previousTasks) => [...previousTasks, newTask])
    setTaskInput('')
  }

  function HandleDelete(index: number) {
    setTasks((previousTasks) =>
      previousTasks.filter((_, i) => i !== index)
    )
  }

  return (
    <section className="bg-[#030A18] opacity-90 p-4 h-[calc(100vh-200px)] flex flex-col gap-4">
      <p className="bg-gray-700 text-white text-center py-2 max-w-[200px] rounded-xl opacity-75">
        {new Date().toLocaleDateString('ru-RU')}
      </p>

      <div>
        <div className="p-4 flex gap-2">
          <input
            className="w-full h-10 border border-gray-300 rounded-xl p-2"
            type="text"
            placeholder="task..."
            value={taskInput}
            onChange={HandleChange}
          />
          <button
            className="bg-blue-900 px-4 py-2 rounded-xl hover:bg-blue-800 cursor-pointer"
            onClick={HandleAdd}
          >
            add
          </button>
        </div>

        <div className="mb-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-4 border-b border-gray-300 justify-between"
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <p className="text-gray-500 text-sm">{index + 1}.</p>
                <p className="text-white font-medium">{task}</p>
              </div>
              <button className="bg-red-900 px-4 py-2 rounded-xl hover:bg-red-800 cursor-pointer" onClick={() => HandleDelete(index)}>
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}