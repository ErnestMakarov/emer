import { createBrowserRouter } from 'react-router'
import App from './App.tsx'
import Home from '../pages/Home/Home.tsx'
import Todo from '../workspace/Todo.tsx'
import Settings from '../workspace/Settings.tsx'
import LogIn from '../pages/LogIn/LogIn.tsx'
import SingUp from '../pages/SingUp/SingUp.tsx'
import WorkspaceLayout from '../components/layout/WorkspaceLayout.tsx'


export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
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
  },
  
  {
    path: '/workspace',
    Component: WorkspaceLayout,
    children: [
      {
        path: 'todo',
        Component: Todo,
      },
      {
        path: 'settings',
        Component: Settings,
      }
    ]
  }
])