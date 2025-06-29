import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-400 py-8 border-t border-[#1e293b]">

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo + Copyright */}
        <div className="flex items-center gap-3">
          <Logo width="100px" />
          <span className="text-sm">&copy; {new Date().getFullYear()} Thought Blog</span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex space-x-4 text-sm">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/all-posts" className="hover:text-white">Posts</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
