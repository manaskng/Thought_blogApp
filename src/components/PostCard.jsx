import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="rounded-xl max-h-48 object-contain"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "/fallback-image.svg"  // fallback image from public folder
            }}
          />
        </div>
        <div className='w-full bg-[#1e293b] rounded-xl p-4 shadow-md hover:shadow-lg transition'>
  <h2 className='text-lg font-semibold text-slate-100'>{title}</h2>
</div>
      </div>
    </Link>
  )
}

export default PostCard
