"use client";

import React, { useState, useEffect } from "react";
import { Eye, Search, Check, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/ui/Pagination";

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSpecies, setFilterSpecies] = useState("all");
  const [selectedPet, setSelectedPet] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Fetch both /api/pets and /api/admin/pets
  const fetchAllPets = async () => {
    try {
      const localRes = await fetch("/data/pets.json");
      const localPets = await localRes.json();

      const [apiPublic, apiAdmin] = await Promise.all([
        fetch("/api/pets", { cache: "no-store" }),
        fetch("/api/admin/pets", { cache: "no-store" }),
      ]);

      const petsPublic = apiPublic.ok ? await apiPublic.json() : [];
      const petsAdmin = apiAdmin.ok ? await apiAdmin.json() : [];

      // Merge unique pets (avoid duplicates)
      const allPets = [
        ...localPets,
        ...petsPublic.filter(
          (pet) =>
            !localPets.some(
              (lp) =>
                (lp._id?.$oid || lp._id) === (pet._id?.$oid || pet._id)
            )
        ),
        ...petsAdmin.filter(
          (pet) =>
            !localPets.some(
              (lp) =>
                (lp._id?.$oid || lp._id) === (pet._id?.$oid || pet._id)
            )
        ),
      ];

      setPets(allPets);
      setFilteredPets(allPets);
    } catch (err) {
      console.error("❌ Error loading pets:", err);
    }
  };

  useEffect(() => {
    fetchAllPets();
  }, []);

 
  useEffect(() => {
    let results = pets;

    if (searchTerm) {
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.species.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      results = results.filter((p) => p.status === filterStatus);
    }

    if (filterSpecies !== "all") {
      results = results.filter(
        (p) => p.species.toLowerCase() === filterSpecies.toLowerCase()
      );
    }

    setFilteredPets(results);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterSpecies, pets]);

  //  Status Color 
  const getStatusBadge = (status) => {
    const map = {
      available: "bg-green-500/80 text-white",
      adopted: "bg-gray-400/80 text-white",
      reserved: "bg-yellow-500/80 text-white",
      pending: "bg-blue-500/80 text-white",
      rejected: "bg-red-500/80 text-white",
    };
    return map[status] || "bg-purple-500 text-white";
  };

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredPets.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPets.length / rowsPerPage);

  //  Update Pet Status (both admin & public)
  const handleStatusChange = async (id, status) => {
    try {
     
      await Promise.all([
        fetch(`/api/pets/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }),
        fetch(`/api/admin/pets/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }),
      ]);

      setPets((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status } : p))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  //  Delete Pet (both admin & public)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;
    try {
      await Promise.all([
        fetch(`/api/pets/${id}`, { method: "DELETE" }),
        fetch(`/api/admin/pets/${id}`, { method: "DELETE" }),
      ]);
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  };

  return (
    <div className="p-6 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-4 mb-8 text-3xl font-extrabold md:flex-row">
          <h1 className="mt-2 mb-5 text-4xl font-bold text-base-content">
             Manage Pets
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center px-3 py-2 border border-gray-300 text-base-content dark:bg-gray-800/60 rounded-xl backdrop-blur">
              <Search className="w-4 h-4 " />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-2 text-sm bg-transparent outline-none text-base-content "
              />
            </div>
            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-xl text-base-content dark:border-gray-700 bg-base-100 "
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="adopted">Adopted</option>
              <option value="reserved">Reserved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              onChange={(e) => setFilterSpecies(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-xl bg-base-100 dark:text-gray-200 dark:border-gray-700"
            >
              <option value="all">All Species</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 shadow-lg rounded-xl dark:border-gray-700">
          <table className="w-full min-w-[700px]  text-left">
            <thead className="text-white bg-gradient-to-r from-emerald-400 to-teal-500 ">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Species</th>
                <th className="px-6 py-3">Age</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentRows.length > 0 ? (
                  currentRows.map((pet, idx) => (
                    <motion.tr
                      key={pet._id?.$oid || pet._id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                       className="transition hover:bg-green-100 hover:text-black"
                    >
                      <td className="px-6 py-3">
                        <img
                          src={pet.image || pet.imageUrl?.[0]}
                          alt={pet.name}
                          className="object-cover w-16 h-16 rounded-lg shadow-sm"
                        />
                      </td>
                      <td>{pet.name}</td>
                      <td className="capitalize">{pet.species}</td>
                      <td>{pet.age} yrs</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            pet.status
                          )}`}
                        >
                          {pet.status}
                        </span>
                      </td>
                      <td className="flex justify-center gap-2 px-6 py-3 text-center">
                        {pet.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(pet._id, "available")
                              }
                              className="p-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(pet._id, "rejected")
                              }
                              className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setSelectedPet(pet)}
                          className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(pet._id)}
                          className="p-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      No pets found.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination 
           currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        ></Pagination>
      
      </motion.div>

      {/*  Pet Modal */}
      <AnimatePresence>
        {selectedPet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-11/12 max-w-md p-6 bg-white shadow-xl dark:bg-gray-800 rounded-2xl"
            >
              <button
                onClick={() => setSelectedPet(null)}
                className="absolute text-gray-500 top-3 right-4 hover:text-red-500"
              >
                ✕
              </button>
              <img
                src={selectedPet.image || selectedPet.imageUrl?.[0]}
                alt={selectedPet.name}
                className="object-cover w-full mb-3 h-52 rounded-xl"
              />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {selectedPet.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Species: {selectedPet.species}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Age: {selectedPet.age} yrs
              </p>
              <p className="mb-2 text-gray-600 dark:text-gray-300">
                Status:{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    selectedPet.status
                  )}`}
                >
                  {selectedPet.status}
                </span>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                {selectedPet.description || "No description available."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagePets;
