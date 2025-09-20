"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PetDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [allPets, setAllPets] = useState([]);

  useEffect(() => {
    fetch("/data/pets.json")
      .then((res) => res.json())
      .then((data) => {
        setAllPets(data);
        const foundPet = data.find((p) => p._id.$oid === id);
        setPet(foundPet);
      });
  }, [id]);

  if (!pet) return <p className="text-center mt-10">Loading...</p>;

// pet suggestt
  const suggestedPets = allPets.filter(
    (p) =>
      p._id.$oid !== pet._id.$oid &&
      (p.species === pet.species ||
        p.breed === pet.breed ||
        p.location === pet.location)
  );

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

            {/* description */}
            <p className="text-lg text-base-content">{pet.description}</p>

            {/* health Info Card */}
            <div className="bg-base-200 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-base-content">Health Information</h2>
              <p>{pet.healthInfo}</p>
              <p className="mt-2 text-base-content">
                Vaccinated:{" "}
                <span className="font-medium text-base-content">
                  {pet.vaccinated ? "Yes" : "No"}
                </span>
              </p>
            </div>

            {/* Shelter Info card */}
            <div className="bg-base-300 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-base-content">Shelter Information</h2>
              <p className="text-base-content">Location: {pet.location}</p>
              <p>Adoption Fee: ${pet.adoptionFee}</p>
              <p>
                Contact:{" "}
                <span className="font-medium text-base-content">{pet.shelterContact}</span>
              </p>
            </div>

            {/* apply button */}
            <button
              onClick={() => alert(`Applied to adopt ${pet.name}!`)}
              className="mt-4 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Apply for Adoption
            </button>
          </div>
        </div>

        {/* suggested  */}
        {suggestedPets.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl text-base-content font-bold mb-6">Suggested Pets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedPets.slice(0, 3).map((spet) => (
                <div
                  key={spet._id.$oid}
                  className="bg-base-300 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={spet.imageUrl}
                    alt={spet.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg text-base-content font-semibold">{spet.name}</h3>
                    <p className="text-sm text-base-content">{spet.species}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
