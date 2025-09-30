"use client";

import { useEffect, useState } from "react";
import { FaPaw } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function OurGallery() {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;

  useEffect(() => {
    fetch("/data/pets.json")
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.error("Error fetching pets:", err));
  }, []);

  // Load currentPage from localStorage on mount
  useEffect(() => {
    const savedPage = localStorage.getItem("galleryPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  // Save currentPage to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("galleryPage", currentPage.toString());
  }, [currentPage]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

  // Convert all images into one array
  const allImages = pets.flatMap((pet) =>
    pet.imageUrl.map((img, idx) => ({
      id: `${pet._id?.$oid || pet._id}-${idx}`,
      name: pet.name,
      img,
    }))
  );

  // Pagination calculation
  const totalPages = Math.ceil(allImages.length / imagesPerPage);
  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;
  const currentImages = allImages.slice(indexOfFirst, indexOfLast);

  return (
    <section className="py-20 bg-base-100 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
            <FaPaw className="text-green-500" />
            <span className="text-base-content">Our Gallery</span>
            <FaPaw className="text-green-500" />
          </h2>
          <p className="mt-2 text-base-content">
            A glimpse of our adorable pets waiting for love & care.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currentImages.map((item, index) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100} 
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-green-600/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="text-white font-semibold">{item.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-20 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-green-600 text-base-content rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-green-700 text-white"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Floating paw background */}
      <FaPaw className="absolute top-10 left-10 text-green-200 text-5xl rotate-12" />
      <FaPaw className="absolute bottom-20 right-12 text-green-100 text-6xl -rotate-12" />
    </section>
  );
}
