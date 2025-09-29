"use client";
import { useState, useEffect } from "react";
import FilterBar from "@/components/ui/FilterBar";
import PetCard from "@/components/ui/PetCard";
import AOS from "aos";
import "aos/dist/aos.css";

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

  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 4;

  //  client side e localStorage theke portesi
   // ekhane pagination 3 dile seta local storage e save hobe,abar jodi reload dei taile useState local storage theke value nibe, then page 3 e abar show korbe, 1 e jabena...filter ba search kolreo emon thakbe

  // Load currentPage from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPage = localStorage.getItem("currentPage");
      if (savedPage) {
        setCurrentPage(Number(savedPage));
      }
    }

    // Initialize AOS
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

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

  // Pagination
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      localStorage.setItem("currentPage", page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto bg-base-100 px-4 py-36 md:py-48 text-base-content">
      <h1 className="text-3xl font-bold text-center mb-2">
        Find Your Perfect Companion
      </h1>
      <p className="text-center mb-6">
        Browse through our pets and adopt your new best friend today.
      </p>

      <FilterBar
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="grid max-w-7xl mx-auto py-20 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentPets.length > 0 ? (
          currentPets.map((pet, index) => (
            <div
              key={pet._id.$oid}
              data-aos="fade-up"
              data-aos-delay={index * 100} 
            >
              <PetCard pet={pet} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No pets found</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
