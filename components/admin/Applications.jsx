"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminApplications({ adminUid }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch all applications
  const fetchApps = async () => {
    try {
      const res = await fetch("/api/admin/applications", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApps(data);
    } catch (err) {
      console.error(err);
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // Update application status
  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminUid }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      Swal.fire("Updated!", `Application status set to ${status}`, "success");
      fetchApps();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter and search applications
  const filteredApps = apps.filter((a) => {
    const matchesFilter = filterType === "all" || a.status === filterType;
    const matchesSearch =
      a.reason?.toLowerCase().includes(searchText.toLowerCase()) ||
      a.experience?.toLowerCase().includes(searchText.toLowerCase()) ||
      a.references?.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading)
    return (
      <div className="flex justify-center text-base-content items-center min-h-[200px] ">
        Loading applications...
      </div>
    );

  return (
    <div className="min-h-screen p-6">
      <h1 className="mt-2 mb-8 text-4xl font-bold">
        Admin Applications
      </h1>

      {/* Filter & Search */}
      <div className="flex flex-col items-center gap-3 mb-6 md:flex-row">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 font-extrabold border border-gray-300 text-base-content rounded-xl dark:border-gray-700 bg-base-100 md:flex-row "
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
        <div className="flex items-center px-3 py-2 border border-gray-300 rounded-xl backdrop-blur">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search by reason, experience, references"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="ml-2 text-sm bg-transparent outline-none text-base-content "
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto border border-gray-200 shadow-xl rounded-xl dark:border-gray-700 backdrop-blur">
        <table className="w-full min-w-[700px]  text-sm text-left">
          <thead className="text-white bg-gradient-to-r from-emerald-400 to-teal-500 ">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Living Situation</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">References</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Decision By</th>
              <th className="px-4 py-3">Decision At</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredApps.length === 0 && (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={9} className="py-6 text-center text-gray-500 dark:text-gray-400">
                    No applications found
                  </td>
                </motion.tr>
              )}

              {filteredApps.map((a) => (
                <motion.tr
                  key={a._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="transition border-b border-gray-200 dark:border-gray-700 hover:text-black hover:bg-gray-50 dark:hover:bg-gray-700/40"
                >
                  <td className="px-4 py-2">{a.applicationType}</td>
                  <td className="px-4 py-2">{a.experience || "-"}</td>
                  <td className="px-4 py-2">{a.livingSituation || "-"}</td>
                  <td className="px-4 py-2">{a.reason || "-"}</td>
                  <td className="px-4 py-2">{a.references || "-"}</td>
                  <td className="px-4 py-2 capitalize">{a.status}</td>
                  <td className="px-4 py-2">{a.decisionBy || "-"}</td>
                  <td className="px-4 py-2">{a.decisionAt ? new Date(a.decisionAt).toLocaleString() : "-"}</td>
                  <td className="flex justify-center gap-2 px-4 py-2">
                    {a.status !== "approved" && (
                      <button
                        onClick={() => handleStatusChange(a._id, "approved")}
                        disabled={updatingId === a._id}
                        className="px-2 py-1 text-white transition bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Approve
                      </button>
                    )}
                    {a.status !== "rejected" && (
                      <button
                        onClick={() => handleStatusChange(a._id, "rejected")}
                        disabled={updatingId === a._id}
                        className="px-2 py-1 text-white transition bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
