"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/adoptions");
      const result = await res.json();
      if (result.success) {
        setApplications(result.data);
      } else {
        setApplications([]);
        console.error("Failed to fetch applications:", result.message);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplications([]);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`/api/adoptions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success(`Application ${status}`);
        setApplications(applications.map(app =>
          app._id === id ? { ...app, status } : app
        ));
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 min-h-screen pt-20">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-xl font-bold mb-4 text-center">
        Admin Dashboard
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="text-center">
            <th className="border p-2">Type</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Visit Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="text-center">
              <td className="border p-2">{app.applicationType}</td>
              <td className="border p-2">{app.status}</td>
              <td className="border p-2">{app.visitDate}</td>
              <td className="border p-2 flex justify-center gap-2">
                {app.status === "pending" ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleStatusChange(app._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleStatusChange(app._id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : app.status === "approved" ? (
                  <button className="bg-green-500 text-white px-2 py-1 rounded">
                    Approved
                  </button>
                ) : (
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Rejected
                  </button>
                )}
              </td>
            </tr>
          ))}

          {applications.length === 0 && (
            <tr>
              <td colSpan={5} className="border p-2 text-center">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
