"use client";

import { useEffect, useState } from "react";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

useEffect(() => {
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

  fetchApplications();
}, []);

  return (
    <div className="bg-black">
      <h2 className="text-xl font-bold mb-4 text-center">My Applications</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Type</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Visit Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td className="border p-2 text-center">{app.applicationType}</td>
              <td className="border p-2 text-center">{app.status}</td>
              <td className="border p-2 text-center">{app.visitDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
