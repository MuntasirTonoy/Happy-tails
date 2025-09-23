"use client";
import { useEffect, useState } from "react";

export default function ShelterList() {
  const [shelters, setShelters] = useState([]);

  const load = async () => {
    const res = await fetch("/api/shelters");
    const data = await res.json();
    setShelters(data);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await fetch("/api/shelters", {
      method: "PATCH",
      body: JSON.stringify({ id, status })
    });
    load();
  };

  const handleDelete = async (id) => {
    await fetch("/api/shelters", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });
    load();
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">All Shelters</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th><th>Owner</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shelters.map(s => (
            <tr key={s._id} className="border-t">
              <td>{s.shelterName}</td>
              <td>{s.ownerName} ({s.ownerEmail})</td>
              <td>
                <span className={`px-2 py-1 rounded text-white ${s.status==="approved"?"bg-green-500":s.status==="pending"?"bg-yellow-500":"bg-red-500"}`}>
                  {s.status}
                </span>
              </td>
              <td className="space-x-2">
                <button onClick={() => updateStatus(s._id,"approved")} className="px-2 py-1 bg-green-600 text-white rounded">Approve</button>
                <button onClick={() => updateStatus(s._id,"rejected")} className="px-2 py-1 bg-red-600 text-white rounded">Reject</button>
                <button onClick={() => handleDelete(s._id)} className="px-2 py-1 bg-gray-600 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
