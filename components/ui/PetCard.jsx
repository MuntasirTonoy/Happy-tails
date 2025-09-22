"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function PetCard({ pet }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = () => {
    let updated = [];
    if (favorites.includes(pet._id.$oid)) {
      updated = favorites.filter((id) => id !== pet._id.$oid);
    } else {
      updated = [...favorites, pet._id.$oid];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFav = favorites.includes(pet._id.$oid);

  return (
    <div className="relative bg-base-200 shadow-md rounded-xl overflow-hidden group flex flex-col h-full">
      {/* Favorite button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 bg-gray-300 rounded-full p-1 text-green-600 text-xl"
      >
        {isFav ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Image */}
      <div className="w-full h-56 md:h-60 lg:h-64 overflow-hidden rounded-t-xl flex-shrink-0">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex-col  flex-1">
        <h3 className="text-lg font-semibold">{pet.name}</h3>
        <p className="text-sm mb-3">
          {pet.species}, {pet.age} years
        </p>
        <div className="mt-auto  gap-2">
          <Link href={`/pets/${pet._id.$oid}`}>
            <button className="px-3 py-2 text-gray-700 font-semibold text-sm bg-green-200 hover:bg-green-300  rounded-md w-full mb-3">
              View Details
            </button>
          </Link>
          <button className="px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md w-full">
            Apply to Adopt
          </button>
        </div>
      </div>
    </div>
  );
}
