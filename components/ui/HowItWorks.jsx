"use client";

import { useEffect, useState } from "react";

export default function HowItWorks() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("/data/pets.json")
      .then((res) => res.json())
      .then((allPets) => {
        setPets(allPets.slice(0, 3));
      });
  }, []);

  return (
    <section className="bg-base-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-4xl text-base-content font-bold mb-4">How Happy Tail Works</h2>
        <p className="text-lg text-base-content  mb-12">
          Our platform simplifies the pet adoption process by connecting loving homes with pets in need.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div
              key={pet._id.$oid}
              className="bg-base-300 rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Image */}
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />

              {/* Name */}
              <h3 className="text-xl text-base-content font-semibold mt-4 px-4">{pet.name}</h3>

              {/* description*/}
              <p className="text-base-content mt-2 mb-4 px-4">
                {pet.description || "Adopt this lovely pet and give them a loving home."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
