import { createBrowserRouter } from 'react-router'
import App from './App.tsx'
import Home from '../pages/Home/Home.tsx'
import Todo from '../pages/Todo/Todo.tsx'


export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'todo',
        Component: Todo,
      }
    ]
  }
])