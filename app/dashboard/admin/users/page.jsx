"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table"); // "table" or "card"

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to load users!",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Suspend / Reactivate
  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text:
        currentStatus === "active"
          ? "This user will be suspended."
          : "This user will be reactivated.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText:
        currentStatus === "active" ? "Yes, suspend!" : "Yes, reactivate!",
      cancelButtonText: "Cancel",
      confirmButtonColor: currentStatus === "active" ? "#d33" : "#3085d6",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      Swal.fire({
        icon: "success",
        title:
          newStatus === "active" ? "User Reactivated!" : "User Suspended!",
        showConfirmButton: false,
        timer: 1500,
      });

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
      );
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not update user status.",
      });
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Delete User?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "User deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete user.",
      });
    }
  };

  if (loading)
    return <div className="p-10 text-center text-base-content">Loading users...</div>;

  return (
    <div className="p-6 text-base-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
          Manage Users
        </h2>
        <motion.button
          onClick={() => setView(view === "table" ? "card" : "table")}
          className="px-4 py-2 font-semibold transition-transform rounded-lg shadow-lg text-base-content bg-gradient-to-r from-emerald-400 to-teal-500 hover:scale-105"
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
            className="overflow-x-auto border border-gray-200 shadow-lg rounded-xl backdrop-blur-md bg-white/30"
          >
            <table className="w-full min-w-[700px] text-left">
              <thead className="text-white bg-gradient-to-r from-emerald-400 to-teal-500">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Has Shelter</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="transition hover:bg-green-100 hover:text-black"
                    >
                      <td className="px-4 py-2 font-medium border">{user.name}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 capitalize border">{user.role}</td>
                      <td className="px-4 py-2 text-center border">
                        {user.ownedShelterId ? (
                          <span className="font-medium text-green-700">Yes</span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td
                        className={`px-4 py-2 border text-sm font-medium ${
                          user.status === "active" ? "text-green-700" : "text-red-600"
                        }`}
                      >
                        {user.status}
                      </td>
                      <td className="px-4 py-2 space-x-2 text-sm border">
                        {user.role !== "admin" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(user._id, user.status)
                              }
                              className={`px-3 py-1 rounded text-white ${
                                user.status === "active"
                                  ? "bg-yellow-500 hover:bg-yellow-600"
                                  : "bg-green-700 hover:bg-green-800"
                              }`}
                            >
                              {user.status === "active" ? "Suspend" : "Reactivate"}
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center border text-base-content">
                      No users found.
                    </td>
                  </tr>
                )}
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
            {users.length > 0 ? (
              users.map((user) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }}
                  className="p-6 shadow-lg rounded-2xl backdrop-blur-md bg-gradient-to-r from-emerald-400 to-teal-500 text-base-content"
                >
                  <h3 className="mb-2 text-xl font-semibold ">{user.name}</h3>
                  <p className="mb-1 ">{user.email}</p>
                  <p className="mb-1 capitalize ">Role: {user.role}</p>
                  <p className="mb-1 ">
                    Has Shelter:{" "}
                    {user.ownedShelterId ? (
                      <span className="font-medium ">Yes</span>
                    ) : (
                      <span className="font-medium text-red-500">No</span>
                    )}
                  </p>
                  <p
                    className={`mb-3 font-medium ${
                      user.status === "active" ? "text-green-100" : "text-red-500"
                    }`}
                  >
                    Status: {user.status}
                  </p>
                  {user.role !== "admin" && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleStatusChange(user._id, user.status)}
                        className={`px-3 py-1 rounded text-white font-medium ${
                          user.status === "active"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-700 hover:bg-green-800"
                        }`}
                      >
                        {user.status === "active" ? "Suspend" : "Reactivate"}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full text-white/80">
                No users found.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
