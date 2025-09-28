"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
          <div className="flex items-center gap-3 text-sm mb-3">
            <span>{post.category}</span> • <span>{post.date}</span> • <span>By {post.author}</span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-86 lg:h-120 object-cover rounded-lg mb-6"
          />
        </header>

        <article className="prose max-w-none">
          <p>{post.content}</p>
        </article>

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
