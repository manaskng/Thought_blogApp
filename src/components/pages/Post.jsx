import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Container from "../container/Container";
import Button from "../Button";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const [likes, setLikes] = useState(0);
  const [endorse, setEndorse] = useState(0);
  const [useful, setUseful] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <section className="py-10 px-4 bg-[#0f172a] text-gray-100 min-h-screen">
      <Container>
        <h1 className="text-4xl font-bold text-cyan-400 mb-4 text-center">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${userData?.name || "User"}&background=random`}
            alt="Author"
            className="w-10 h-10 rounded-full border-2 border-cyan-500 shadow-sm"
          />
          <div>
            <p className="text-sm font-semibold">{userData?.name || "Author"}</p>
            <p className="text-xs text-gray-400">
              Published on {new Date(post?.$createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full mb-8 relative overflow-hidden rounded-2xl border border-gray-700 shadow-md bg-[#1e293b]">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full max-h-[420px] object-contain transition duration-300 hover:scale-[1.01]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-image.svg";
            }}
          />
          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-600 hover:bg-green-700" className="text-sm px-3 py-1">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-600 hover:bg-red-700"
                className="text-sm px-3 py-1"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Tags */}
        {post?.tags?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Post Content */}
        <div className="prose max-w-none dark:prose-invert prose-img:rounded-lg prose-a:text-cyan-400 prose-a:underline">
          {parse(post.content)}
        </div>

        {/* Reactions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            bgColor="bg-rose-100 hover:bg-rose-200"
            textColor="text-rose-600"
            onClick={() => setLikes((prev) => prev + 1)}
          >
            ❤️ Like ({likes})
          </Button>

          <Button
            bgColor="bg-lime-100 hover:bg-lime-200"
            textColor="text-lime-700"
            onClick={() => setUseful((prev) => prev + 1)}
          >
            👍 Useful ({useful})
          </Button>

          <Button
            bgColor="bg-blue-100 hover:bg-blue-200"
            textColor="text-blue-700"
            onClick={() => setEndorse((prev) => prev + 1)}
          >
            🌟 Endorse ({endorse})
          </Button>

          <Button
            bgColor={saved ? "bg-purple-200" : "bg-gray-100"}
            textColor={saved ? "text-purple-800" : "text-gray-600"}
            onClick={() => setSaved((prev) => !prev)}
          >
            🔖 {saved ? "Saved" : "Save for Later"}
          </Button>
        </div>
      </Container>
    </section>
  ) : null;
}
