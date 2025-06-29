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
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'My Posts', slug: '/my-posts', active: authStatus },
  ]

  return (
    <header className="px-4 py-2 rounded-full
     text-cyan-400 bg-[#121828]
      hover:text-white hover:bg-indigo-950 transition-all duration-200">

      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/">
            <Logo width="30px" />
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`relative text-sm font-medium transition duration-300 tracking-wide ${
                        location.pathname === item.slug
                          ? 'text-blue-400'
                          : 'text-gray-200 hover:text-white'
                      } before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2
                      before:w-0 before:h-[2px] before:bg-blue-500 before:transition-all before:duration-300
                      hover:before:w-full`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Authenticated dropdown */}
            {authStatus && userData && (
              <li className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-white"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <img
                    src="\profile-image.png" 
                    alt="profile"
                    className="w-8 h-8 rounded-full border border-gray-400"
                  />
                  <FiChevronDown className="text-lg" />
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-neutral-800 shadow-lg rounded-md overflow-hidden z-20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700"
                    >
                      Profile
                    </Link>
                    <div className="border-t border-neutral-600"></div>
                    <div className="block px-4 py-2">
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
