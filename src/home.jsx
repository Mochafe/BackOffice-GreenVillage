import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './component/navbar'

function Home() {
  return (
    <>
      <Navbar />
      <Outlet />
      <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js' />
    </>
  )
}

export default Home
