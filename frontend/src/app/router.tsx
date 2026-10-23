import { createBrowserRouter } from 'react-router'
import App from './App.tsx'
import Home from '../pages/Home/Home.tsx'
import Todo from '../pages/Workspace/Calendar/Calendar.tsx'
import Settings from '../pages/Workspace/Settings/Settings.tsx'
import LogIn from '../pages/LogIn/LogIn.tsx'
import SingUp from '../pages/SingUp/SingUp.tsx'
import WorkspaceLayout from '../layouts/WorkspaceLayout.tsx'
import Main from '../pages/Workspace/Main/Main.tsx'
import Profile from '../pages/Workspace/Profile/Profile.tsx'
import ProjectPage from '../pages/Workspace/ProjectPage/ProjectPage.tsx'


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
        path: 'main',
        Component: Main,
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
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'projects/:id',
        Component: ProjectPage,
      }
    ]
  }
])