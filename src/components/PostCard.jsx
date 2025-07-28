import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-slate-800 hover:bg-slate-700 transition-colors duration-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer border border-slate-700">
        
        {/* Image */}
        <div className="w-full h-48 bg-slate-900 flex items-center justify-center overflow-hidden">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "/fallback-image.svg"
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-white leading-tight line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
