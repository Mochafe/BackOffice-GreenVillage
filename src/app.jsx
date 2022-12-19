import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './component/navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}