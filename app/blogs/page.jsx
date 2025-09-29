"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { FaPaw } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function BlogsPage() {
  const router = useRouter();
  
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [isInitialized, setIsInitialized] = useState(false);
  const perPage = 3;

  // etar kaj url theke page parameter shudhu ekba er jonno pora
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const pageFromUrl = urlParams.get('page');
    
    let pageToSet = 1;
    
    if (pageFromUrl) {
      const pageNum = parseInt(pageFromUrl);
      if (!isNaN(pageNum) && pageNum > 0) {
        pageToSet = pageNum;
        console.log("Setting page from URL:", pageNum);
      }
    } else {
      const savedPage = localStorage.getItem("blogs_currentPage");
      if (savedPage) {
        const pageNum = parseInt(savedPage);
        if (!isNaN(pageNum) && pageNum > 0) {
          pageToSet = pageNum;
          console.log("Setting page from localStorage:", pageNum);
        }
      }
    }
    
    // both state and localStorage set kore directly
    setCurrentPage(pageToSet);
    localStorage.setItem("blogs_currentPage", pageToSet.toString());
    
    //  URL immediately ekhane update hoy
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageToSet.toString());
    window.history.replaceState({}, '', url.toString());
    
    console.log("Initial page set to:", pageToSet);
    setIsInitialized(true);
  }, []);

  // blogs load hochche....
  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data || []))
      .catch(() => setBlogs([]));
  }, []);

  // URL update kore jokho  page chang hobe - eta kokhon user interact korbe..nahole update korbona...
  useEffect(() => {
    if (!isInitialized) return;
    
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage.toString());
    
    window.history.replaceState({}, '', url.toString());
    localStorage.setItem("blogs_currentPage", currentPage.toString());
    
    console.log("Page updated to:", currentPage);
  }, [currentPage, isInitialized]);

  // Save scroll position
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleScroll = () => {
      localStorage.setItem(`blogs_scroll_${currentPage}`, window.scrollY.toString());
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, isInitialized]);

  //filter ei kogic onujayi hoise....
  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchesCategory = category === "All" || b.category === category;
      const matchesSearch =
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
        b.content?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, category, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const startIdx = (currentPage - 1) * perPage;
  const currentItems = filtered.slice(startIdx, startIdx + perPage);

  // Adjust current page tokhone korbo jokhon current page ta  invalid nahloe adjust korbona 
  useEffect(() => {
    if (!isInitialized || filtered.length === 0) return;
    
    if (currentPage > totalPages && totalPages > 0) {
      console.log(" Adjusting page from", currentPage, "to", totalPages, "because current page is invalid");
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages, isInitialized, filtered.length]);

  //  scroll position k ekhane store korsi
  useEffect(() => {
    if (!isInitialized) return;
    
    const savedScroll = localStorage.getItem(`blogs_scroll_${currentPage}`);
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, Number(savedScroll));
      }, 50);
    }
  }, [currentPage, isInitialized]);

  const handlePageChange = (page) => {
    console.log(" User clicked page:", page);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    //e khane search change  page 1e jabena....
    // setCurrentPage(1); // ei line ar kokhohkhono dibona.. 
  };

  const handleCategoryChange = (c) => {
    setCategory(c);
    //ekhane vul korsilam..ekhane category change hole page 1-e nibona...
    // setCurrentPage(1); // ei line jiboneo ar kokhohkhono dibona..
  };

  const categories = useMemo(() => {
    const set = new Set(blogs.map((b) => b.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [blogs]);

  // loading state initialized na howa porjon to..
  if (!isInitialized) {
    return (
      <div className="bg-base-100">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-36">
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-36">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-base-content">HappyTails Blog</h1>
          <p className="mt-2 text-base-content">
            Tips, adoption stories and announcements from the HappyTails team.
          </p>
        </div>

        {/* search */}
        <div className="mb-12">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search articles..."
            className="w-full px-4 py-3 border rounded-lg text-base-content shadow-sm"
          />
        </div>

        {/* categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => handleCategoryChange(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                category === c
                  ? "bg-green-600 text-white shadow"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.length === 0 ? (
            <p className="text-center py-20 text-base-content">
              {filtered.length === 0 ? "No articles found." : `No articles on page ${currentPage}. Showing page 1.`}
            </p>
          ) : (
            currentItems.map((b) => (
              <article
                key={b.id}
                className="bg-base-200 rounded-lg shadow-md flex flex-col overflow-hidden h-full"
              >
                <div className="w-full h-56">
                  <img
                    src={b.thumbnail}
                    alt={b.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center gap-2 text-sm text-green-700 font-semibold">
                      <FaPaw className="text-green-600" /> {b.category}
                    </span>
                    <span className="text-xs text-base-content">• {b.date}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-base-content">{b.title}</h3>
                  <p className="mb-4 flex-1 text-base-content">{b.excerpt}</p>

                  <div className="flex items-center gap-3 mt-auto">
                    <Link 
                      href={`/blogs/${b.id}?page=${currentPage}`}
                      scroll={false}
                    >
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Read More
                      </button>
                    </Link>
                    <span className="text-sm text-base-content">By {b.author}</span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md text-gray-800 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md ${
                    page === currentPage
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}