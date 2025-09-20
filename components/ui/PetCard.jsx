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
    <div className="relative bg-base-200 mx-auto shadow-md rounded-xl overflow-hidden group">
      {/* Favorite button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 text-red-500 text-xl"
      >
        {isFav ? <FaHeart /> : <FaRegHeart />}
      </button>

      <img
        src={pet.imageUrl}
        alt={pet.name}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{pet.name}</h3>
        <p className="text-gray-600 text-sm">
          {pet.species}, {pet.age} years
        </p>
        <div className="mt-3 flex gap-2">
          <Link href={`/pets/${pet._id.$oid}`}>
            <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              View Details
            </button>
          </Link>
          <button className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md">
            Apply to Adopt
          </button>
        </div>
      </div>
    </div>
  );
}
