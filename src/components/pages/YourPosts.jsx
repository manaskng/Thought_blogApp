import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import Container from "../container/Container";
import PostCard from "../PostCard";

export default function YourPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      appwriteService.getPosts().then((posts) => {
        const filtered = posts.documents.filter(
          (post) => post.userId === userData.$id
        );
        setUserPosts(filtered);
      });
    }
  }, [userData]);

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-8">Your Posts</h1>
        {userPosts.length === 0 ? (
          <p className="text-center text-gray-600">You haven’t created any posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
