"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PetDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch("/data/pets.json")
      .then((res) => res.json())
      .then((allPets) => {
        const foundPet = allPets.find((p) => p._id.$oid === id);
        setPet(foundPet);
      });
  }, [id]);

  if (!pet) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-36">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          ← Back to Pets
        </button>

        {/* Flex wrapper */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image */}
          <div className="lg:w-1/2">
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right: Details */}
          <div className="lg:w-1/2 flex flex-col gap-6 text-base-content">
            {/* Name */}
            <h1 className="text-3xl font-bold">{pet.name}</h1>

            {/* Description */}
            <p className="text-lg">{pet.description}</p>

            {/* Health Info Card */}
            <div className="bg-base-200 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Health Information</h2>
              <p>{pet.healthInfo}</p>
              <p className="mt-2">
                Vaccinated:{" "}
                <span className="font-medium">
                  {pet.vaccinated ? "Yes" : "No"}
                </span>
              </p>
            </div>

            {/* Shelter Info Card */}
            <div className="bg-base-200 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Shelter Information</h2>
              <p>Location: {pet.location}</p>
              <p>Adoption Fee: ${pet.adoptionFee}</p>
              <p>
                Contact:{" "}
                <span className="font-medium">{pet.shelterContact}</span>
              </p>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => alert(`Applied to adopt ${pet.name}!`)}
              className="mt-4 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Apply for Adoption
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
