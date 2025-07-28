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
    <div className="w-full py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-black min-h-[80vh] text-white">
      <Container>
        <h1 className="text-4xl font-extrabold text-center mb-10 drop-shadow-sm">
          Your Posts
        </h1>

        {userPosts.length === 0 ? (
          <p className="text-center text-muted text-lg mt-6">
            You haven’t created any posts yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
