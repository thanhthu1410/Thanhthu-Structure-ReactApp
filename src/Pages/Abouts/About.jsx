import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <p>About my information</p>
     
      <Outlet/>
    </div>
    
  )
}
