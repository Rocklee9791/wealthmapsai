'use client'
import Link from 'next/link'

import '../styles/Navbar.css' // Link to external CSS for styling


export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">WealthMapsAI</h1>
      <div className="nav-links">
        <a href='#'>Home</a>
        <a href="#features">Features</a>
        <a href="#workflow">Workflow</a>
        <a href="#about">About</a>
        <Link href="/register-company">
          <button className="cta-button">Register Company</button>
        </Link>
      </div>
    </nav>
  )
}
