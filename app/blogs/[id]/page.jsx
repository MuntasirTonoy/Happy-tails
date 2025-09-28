"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaTwitter, FaInstagram, FaUserCircle, FaThumbsUp, FaComment } from "react-icons/fa";

export default function BlogDetails() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // uRL or localStorage rheke page initialized korsi/////
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = params.get("page");

    if (pageFromUrl) {
      const num = parseInt(pageFromUrl);
      if (!isNaN(num) && num > 0) setPage(num);
    } else {
      const saved = localStorage.getItem("blogs_currentPage");
      if (saved) setPage(Number(saved));
    }
  }, []);

  // fetch blog post
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b) => String(b.id) === String(id));
        setPost(found || null);
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBack = () => {
    // navigate korsi correct page e...
    router.push(`/blogs?page=${page}`);
    setTimeout(() => {
      const savedScroll = localStorage.getItem(`blogs_scroll_${page}`);
      if (savedScroll) {
        window.scrollTo(0, Number(savedScroll));
      }
    }, 50);
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (!post)
    return (
      <div className="py-20 text-center">
        <p>Article not found.</p>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-green-600 text-white rounded-md mt-4"
        >
          Back to Blogs
        </button>
      </div>
    );

  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-40">
        <header className="mb-6">
          <div className="flex items-center text-base-content gap-3 text-sm mb-3">
            <span>{post.category}</span> • <span>{post.date}</span> • <span>By {post.author}</span>
          </div>

          <h1 className="text-3xl text-base-content font-bold mb-4">{post.title}</h1>

          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-86 lg:h-120 object-cover rounded-lg mb-6"
          />
        </header>

        <article className="prose max-w-none">
          <p className="text-base-content">{post.content}</p>
        </article>
        <div className="pt-16 text-green-300"><hr /></div>
        {/* Share Section */}
        <div className="mt-12 mx-auto max-w-7xl">
          <h2 className="text-xl text-base-content text-center  font-semibold mb-4">Share this post</h2>
          <div className="flex justify-center items-center gap-20 py-6">
            <a href="#" className="p-3 bg-green-200 rounded-full text-gray-600 hover:bg-green-300">
              <FaFacebookF size={24}/>
              
            </a>
            <a href="#" className="p-3 bg-green-200 rounded-full text-gray-600 hover:bg-green-300">
              <FaTwitter size={24}/>
              
            </a>
            <a href="#" className="p-3 bg-green-200 rounded-full text-gray-600 hover:bg-green-300">
              <FaInstagram size={24}/>
            </a>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <h2 className="text-xl text-base-content font-semibold mb-6">Comments</h2>
          <div className="flex flex-col gap-6">
            {[
              { name: "Alice", time: "2 days ago", text: "Really enjoyed this article!", likes: 5, comments: 2 },
              { name: "John", time: "5 days ago", text: "Very helpful insights, thanks!", likes: 3, comments: 1 },
              { name: "Sophia", time: "1 week ago", text: "Great read! Looking forward to more.", likes: 8, comments: 4 },
            ].map((c, idx) => (
              <div key={idx} className="flex gap-4 items-start border-b pb-4">
                <FaUserCircle className="text-4xl text-gray-500" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold text-base-content">{c.name}</span>
                    <span className="text-base-content">• {c.time}</span>
                  </div>
                  <p className="mt-1 text-base-content">{c.text}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1 text-base-content">
                      <FaThumbsUp /> {c.likes}
                    </span>
                    <span className="flex items-center text-base-content gap-1">
                      <FaComment /> {c.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
}
