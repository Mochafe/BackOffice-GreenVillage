import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './component/navbar'
import Cookies from 'js-cookie'
import config from '../config.json'

export default function App() {

return (
  <>
    <header>
      <Navbar />
    </header>
    <Outlet />
  </>
)
}