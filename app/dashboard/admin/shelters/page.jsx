"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllShelters,
  updateShelter,
  deleteShelter,
} from "../../../api/admin/adminApi";

const AdminSheltersPage = () => {
  const [shelters, setShelters] = useState([]);
  const [view, setView] = useState("table"); // table or card

  useEffect(() => {
    fetchShelters();
    const interval = setInterval(fetchShelters, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchShelters = async () => {
    try {
      const data = await getAllShelters();
      setShelters(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch shelters:", err);
      setShelters([]);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateShelter(id, { status });
      Swal.fire({
        icon: "success",
        title: `Shelter ${status}`,
        timer: 1500,
        showConfirmButton: false,
      });
      fetchShelters();
    } catch (err) {
      Swal.fire("Error!", err.message || "Something went wrong", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    try {
      await deleteShelter(id);
      Swal.fire("Deleted!", "Shelter has been deleted.", "success");
      fetchShelters();
    } catch (err) {
      Swal.fire("Error!", err.message || "Something went wrong", "error");
    }
  };

  const handleEdit = () => {
    Swal.fire("Info", "Editing is disabled for now.", "info");
  };

  return (
    <div className="min-h-screen p-6 text-base-content">
      <div className="flex items-center mb-6 lg:justify-between ">
        <h2 className="mt-2 mb-5 text-4xl font-bold">
          Manage Shelters
        </h2>
        <motion.button
          onClick={() => setView(view === "table" ? "card" : "table")}
          className="px-4 py-2 transition-transform rounded-lg shadow-lg text-base-content bg-gradient-to-r from-emerald-400 to-teal-500 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {view === "table" ? "Switch to Card View" : "Switch to Table View"}
        </motion.button>
      </div>

      {/* Table View */}
      <AnimatePresence>
        {view === "table" && (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="overflow-x-auto border border-gray-200 shadow-lg rounded-xl backdrop-blur-md bg-white/30 dark:bg-gray-800"
          >
            <table className="w-full min-w-[700px] text-left">
              <thead className="text-white bg-gradient-to-r from-emerald-400 to-teal-500">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Owner</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {shelters.length === 0 && (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="5" className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No shelters found
                      </td>
                    </motion.tr>
                  )}
                  {shelters.map((s) => (
                    <motion.tr
                      key={s._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="transition border-b border-gray-300 dark:border-gray-600 hover:bg-green-100 hover:text-black dark:hover:bg-gray-700"
                    >
                      <td className="p-3 font-medium">{s.shelterName}</td>
                      <td className="p-3">{s.location}</td>
                      <td className="p-3">{s.ownerName}</td>
                      <td className="p-3 capitalize">{s.status}</td>
                      <td className="flex flex-wrap justify-center gap-2 p-3">
                        {s.status !== "approved" && (
                          <button
                            className="px-3 py-1 text-white transition bg-green-600 rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                            onClick={() => handleStatus(s._id, "approved")}
                          >
                            Approve
                          </button>
                        )}
                        {s.status !== "suspended" && (
                          <button
                            className="px-3 py-1 text-white transition bg-yellow-500 rounded hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500"
                            onClick={() => handleStatus(s._id, "suspended")}
                          >
                            Suspend
                          </button>
                        )}
                        <button
                          className="px-3 py-1 text-white transition bg-red-500 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                          onClick={() => handleDelete(s._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="px-3 py-1 text-white transition bg-blue-400 rounded cursor-not-allowed"
                          onClick={handleEdit}
                        >
                          Edit
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card View */}
      <AnimatePresence>
        {view === "card" && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {shelters.length === 0 && (
              <p className="text-center text-gray-500 col-span-full dark:text-gray-400">
                No shelters found
              </p>
            )}
            {shelters.map((s) => (
              <motion.div
                key={s._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }}
                className="p-6 shadow-lg rounded-2xl backdrop-blur-md bg-gradient-to-r from-emerald-400 to-teal-500 text-base-content"
              >
                <h3 className="mb-2 text-xl font-semibold text-white">{s.shelterName}</h3>
                <p className="mb-1 ">Location: {s.location}</p>
                <p className="mb-1 ">Owner: {s.ownerName}</p>
                <p className={`mb-3 font-medium ${s.status === "approved" ? "text-green-100" : s.status === "suspended" ? "text-red-500" : "text-yellow-300"}`}>
                  Status: {s.status}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.status !== "approved" && (
                    <button
                      className="px-3 py-1 text-white transition bg-green-600 rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                      onClick={() => handleStatus(s._id, "approved")}
                    >
                      Approve
                    </button>
                  )}
                  {s.status !== "suspended" && (
                    <button
                      className="px-3 py-1 text-white transition bg-yellow-500 rounded hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500"
                      onClick={() => handleStatus(s._id, "suspended")}
                    >
                      Suspend
                    </button>
                  )}
                  <button
                    className="px-3 py-1 text-white transition bg-red-500 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                    onClick={() => handleDelete(s._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-3 py-1 text-white transition bg-blue-400 rounded cursor-not-allowed"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSheltersPage;
