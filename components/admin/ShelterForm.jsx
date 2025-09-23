"use client";
import { useState } from "react";

export default function ShelterForm({ onCreated }) {
  const [form, setForm] = useState({
    shelterName: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    images: "",
    ownerName: "",
    ownerEmail: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/shelters", {
      method: "POST",
      body: JSON.stringify({ ...form, images: form.images.split(",") }),
    });
    if (res.ok) {
      setForm({
        shelterName: "",
        location: "",
        contactEmail: "",
        contactPhone: "",
        images: "",
        ownerName: "",
        ownerEmail: "",
      });
      router.refresh(); // ✅ এটা পুরো পেজ রিফ্রেশ করে নতুন ডেটা দেখাবে
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded space-y-2">
      <input className="border p-2 w-full" name="shelterName" placeholder="Shelter Name" value={form.shelterName} onChange={handleChange} />
      <input className="border p-2 w-full" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <input className="border p-2 w-full" name="contactEmail" placeholder="Contact Email" value={form.contactEmail} onChange={handleChange} />
      <input className="border p-2 w-full" name="contactPhone" placeholder="Contact Phone" value={form.contactPhone} onChange={handleChange} />
      <input className="border p-2 w-full" name="images" placeholder="Image URLs (comma separated)" value={form.images} onChange={handleChange} />
      <input className="border p-2 w-full" name="ownerName" placeholder="Owner Name" value={form.ownerName} onChange={handleChange} />
      <input className="border p-2 w-full" name="ownerEmail" placeholder="Owner Email" value={form.ownerEmail} onChange={handleChange} />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Shelter</button>
    </form>
  );
}
