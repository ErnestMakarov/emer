import { createBrowserRouter } from 'react-router'
import App from './App.tsx'
import Home from '../pages/Home/Home.tsx'
import Todo from '../pages/Todo/Todo.tsx'
import Settings from '../pages/Settings/Settings.tsx'
import LogIn from '../pages/LogIn/LogIn.tsx'
import SingUp from '../pages/SingUp/SingUp.tsx'


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
      },
      {
        path: 'settings',
        Component: Settings,
      },
      {
        path: 'login',
        Component: LogIn,
      },
      {
        path: 'signup',
        Component: SingUp,
      }
    ]
  }
])