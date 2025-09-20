"use client";

import { useState, useEffect } from "react";
import FilterBar from "@/components/ui/FilterBar";
import PetCard from "@/components/ui/PetCard";

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    species: "",
    breed: "",
    age: "",
    gender: "",
    size: "",
    vaccinated: "",
    location: "",
  });

  useEffect(() => {
    fetch("/data/pets.json")
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);

  // Filtering logic
  const filteredPets = pets.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(search.toLowerCase()) &&
      (filters.species ? pet.species === filters.species : true) &&
      (filters.breed ? pet.breed === filters.breed : true) &&
      (filters.age
        ? filters.age === "0-1"
          ? pet.age >= 0 && pet.age <= 1
          : filters.age === "2-4"
          ? pet.age >= 2 && pet.age <= 4
          : filters.age === "5+"
          ? pet.age >= 5
          : true
        : true) &&
      (filters.gender ? pet.gender === filters.gender : true) &&
      (filters.size ? pet.size === filters.size : true) &&
      (filters.vaccinated
        ? filters.vaccinated === "Yes"
          ? pet.vaccinated === true
          : pet.vaccinated === false
        : true) &&
      (filters.location ? pet.location === filters.location : true)
    );
  });

  return (
    <div className="mx-auto bg-base-100 px-4 py-36 md:py-48 text-base-content">
      <h1 className="text-3xl font-bold text-center mb-2">
        Find Your Perfect Companion
      </h1>
      <p className="text-center mb-6 ">
        Browse through our pets and adopt your new best friend today.
      </p>

      {/* Pass filters and setFilters */}
      <FilterBar search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} />

      {/* Grid */}
      <div className="grid max-w-7xl mx-auto py-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => <PetCard key={pet._id.$oid} pet={pet} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No pets found</p>
        )}
      </div>
    </div>
  );
}
