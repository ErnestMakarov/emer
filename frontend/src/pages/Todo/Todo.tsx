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

  return (
    <section>
      <p className="bg-gray-700 text-white text-center py-2">
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
            className="bg-green-300 px-4 py-2 rounded-xl hover:bg-green-400 cursor-pointer"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}