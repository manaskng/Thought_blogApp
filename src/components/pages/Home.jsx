import React, { useEffect, useState } from 'react'
import appwriteService from '../../appwrite/config'
import Container from '../container/Container'
import PostCard from '../PostCard'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className="w-full py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-black min-h-[80vh] text-white">
            <Container>
                {/* Heading */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm">
                        {posts.length > 0 ? "Latest Posts" : "Welcome to the Blog"}
                    </h1>
                    <p className="text-muted text-sm mt-2">
                        {posts.length > 0
                            ? "Stay curious. Discover stories, thinking, and expertise from the community."
                            : "Login to read and create amazing posts from the community."}
                    </p>
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center mt-12">
                        <h2 className="text-xl font-semibold text-muted">No posts yet. Be the first to write!</h2>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home
