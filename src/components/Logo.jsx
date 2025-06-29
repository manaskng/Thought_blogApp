import React from 'react'

function Logo({ width = '30px' }) {
  return (
    <img 
      src="/vite.svg" 
      alt="Logo" 
      style={{ width: width, height: 'auto' }} 
    />
  )
}

export default Logo
