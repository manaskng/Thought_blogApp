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

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                {/* Welcome Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-sm">
                        Welcome to the Home Page
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Dive into thoughts shared by the community
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
