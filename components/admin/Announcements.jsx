"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", message: "", authorId: "admin1" });

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/admin/announcements");
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Add new announcement
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.message) return;

    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newAnn = await res.json();
      setAnnouncements([newAnn, ...announcements]);
      setForm({ ...form, title: "", message: "" });
      Swal.fire("Success", "Announcement added", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add announcement", "error");
    }
  };

  // Delete announcement
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This announcement will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
      Swal.fire("Deleted!", "Announcement has been deleted.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete announcement", "error");
    }
  };

  return (
    <div className="min-h-screen p-6 ">
      <h1 className="mt-2 mb-8 text-4xl font-bold">
        Manage Announcements
      </h1>

      {/* Add Form */}
      <form
        onSubmit={handleAdd}
        className="p-4 mb-6 space-y-3 overflow-x-auto border border-gray-200 shadow-xl rounded-xl dark:border-gray-700 backdrop-blur"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
        />
        <button
          type="submit"
          className="px-4 py-2 transition-all shadow-md rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg"
        >
          Add Announcement
        </button>
      </form>

      {/* Announcements Table */}
      <div className="overflow-x-auto border border-gray-200 shadow-xl rounded-xl dark:border-gray-700 backdrop-blur">
        <table className="min-w-full text-sm text-left">
          <thead className="text-white bg-gradient-to-r from-emerald-400 to-teal-500 ">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Posted At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {announcements.length === 0 && (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={4} className="p-4 text-center text-base-content ">
                    No announcements found
                  </td>
                </motion.tr>
              )}

              {announcements.map((a) => (
                <motion.tr
                  key={a._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="transition border-b border-gray-200 dark:border-gray-700 hover:bg-green-100 hover:text-black dark:hover:bg-gray-700/40"
                >
                  <td className="px-4 py-2 font-medium">{a.title}</td>
                  <td className="px-4 py-2">{a.message}</td>
                  <td className="px-4 py-2">
                    {new Date(a.postedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="px-3 py-1 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
