import { Outlet } from 'react-router'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'


export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
