import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-400 py-4 border-t border-[#1e293b] text-sm">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        
        {/* Left: Logo + Copyright */}
        <div className="flex items-center gap-2">
          <Logo width="80px" />
          <span className="text-xs">&copy; {new Date().getFullYear()} Thought Blog</span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex space-x-3">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/all-posts" className="hover:text-white transition">Posts</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
