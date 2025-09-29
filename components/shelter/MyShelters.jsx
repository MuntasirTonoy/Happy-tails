"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function MyShelters() {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = async () => {
    try {
      const res = await fetch("/api/shelter");
      const result = await res.json();
      if (result.success) {
        setShelters(result.data);
      } else {
        setShelters([]);
      }
    } catch (err) {
      console.error("Error fetching shelters:", err);
      setShelters([]);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this shelter?")) return;

    try {
      const res = await fetch(`/api/shelter/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        setShelters(shelters.filter((s) => s._id !== id)); 
      } else {
        toast.error(result.message || "Failed to delete shelter");
      }
    } catch (err) {
      console.error("Error deleting shelter:", err);
      toast.error("Something went wrong while deleting.");
    }
  };

  return (
    <div className="overflow-x-auto bg-black p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-xl font-bold mb-4">My Shelters</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shelters.map((shelter) => (
            <tr key={shelter._id}>
              <td className="border p-2">{shelter.shelterName}</td>
              <td className="border p-2">{shelter.location}</td>
              <td className="border p-2">{shelter.contactEmail}</td>
              <td className="border p-2">{shelter.contactPhone}</td>
              <td className="border p-2">
                <div className="flex justify-center gap-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(shelter._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {shelters.length === 0 && (
            <tr>
              <td colSpan={5} className="border p-2 text-center">
                No shelters found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

