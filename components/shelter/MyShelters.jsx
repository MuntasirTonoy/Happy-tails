"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function MyShelters() {
  const [shelters, setShelters] = useState([]);
  const [editingShelter, setEditingShelter] = useState(null);

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
    toast(
      (t) => (
        <span>
          Are you sure you want to delete this shelter?
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={async () => {
                toast.dismiss(t.id);

                try {
                  const res = await fetch(`/api/shelter/${id}`, {
                    method: "DELETE",
                  });
                  const result = await res.json();

                  if (result.success) {
                    toast.success(result.message || "Shelter deleted successfully");
                    setShelters(shelters.filter((s) => s._id !== id));
                  } else {
                    toast.error(result.message || "Failed to delete shelter");
                  }
                } catch (err) {
                  console.error("Error deleting shelter:", err);
                  toast.error("Something went wrong while deleting.");
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-600 text-white px-2 py-1 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </span>
      ),
      { duration: 4000 }
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedShelter = {
      shelterName: form.shelterName.value,
      location: form.location.value,
      contactEmail: form.contactEmail.value,
      contactPhone: form.contactPhone.value,
    };

    try {
      const res = await fetch(`/api/shelter/${editingShelter._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedShelter),
      });
      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        setShelters(
          shelters.map((s) =>
            s._id === editingShelter._id ? { ...s, ...updatedShelter } : s
          )
        );
        setEditingShelter(null);
      } else {
        toast.error(result.message || "Failed to update shelter");
      }
    } catch (err) {
      console.error("Error updating shelter:", err);
      toast.error("Something went wrong while updating.");
    }
  };

  return (
    <div className="overflow-x-auto bg-black p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-xl font-bold mb-4 text-center">
        My Shelters
      </h2>
      <table className="min-w-full border">
        <thead>
          <tr className="text-center">
            <th className="border p-2">Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shelters.map((shelter) => (
            <tr key={shelter._id} className="text-center">
              <td className="border p-2">{shelter.shelterName}</td>
              <td className="border p-2">{shelter.location}</td>
              <td className="border p-2">{shelter.contactEmail}</td>
              <td className="border p-2">{shelter.contactPhone}</td>
              <td className="border p-2">
                <div className="flex justify-center gap-2">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => setEditingShelter(shelter)}
                  >
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

      {/* Update Modal */}
      {editingShelter && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-black p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">Update Shelter</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="shelterName"
                defaultValue={editingShelter.shelterName}
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="text"
                name="location"
                defaultValue={editingShelter.location}
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="email"
                name="contactEmail"
                defaultValue={editingShelter.contactEmail}
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="text"
                name="contactPhone"
                defaultValue={editingShelter.contactPhone}
                className="border p-2 w-full mb-4"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setEditingShelter(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
