import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiChevronDown } from 'react-icons/fi'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const location = useLocation()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'My Posts', slug: '/my-posts', active: authStatus },
  ]

  return (
    <header className="sticky top-0 z-30 backdrop-blur-lg bg-gradient-to-r from-[#0f172a]/90 to-[#1e293b]/90 shadow-lg rounded-b-2xl">
      <Container>
        <nav className="flex items-center justify-between py-5 px-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
            <Logo width="40px" />
            <span className="text-white font-extrabold text-2xl tracking-wide">MyBlog</span>
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-8">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`relative text-base font-medium px-2 py-1 transition-all duration-300 rounded-lg
                        ${
                          location.pathname === item.slug
                            ? 'text-cyan-400 underline underline-offset-8 decoration-2'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
                        }`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Dropdown */}
            {authStatus && userData && (
              <li className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-white transition-all"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <img
                    src="/profile-image.png"
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-cyan-500 hover:scale-105 transition"
                  />
                  <FiChevronDown className="text-xl text-cyan-300" />
                </div>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-48 bg-[#1f2937] text-white shadow-2xl rounded-xl border border-gray-700 z-50 animate-fade-in">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-neutral-700 transition rounded-t-xl"
                    >
                      Profile
                    </Link>
                    <div className="border-t border-neutral-700" />
                    <div className="px-4 py-2">
                      <LogoutBtn />
                    </div>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
