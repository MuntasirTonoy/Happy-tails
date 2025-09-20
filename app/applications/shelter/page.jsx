"use client";

import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
// import { AiOutlineUpload } from "react-icons/ai";

function FileUpload({ label, name, accept, value, onChange }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
    onChange(e);
  };

  return (
    <div className="space-y-1">
      <label className="block font-semibold">{label}</label>
      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md h-32 cursor-pointer">
        <CiImageOn className="text-4xl text-gray-500" />
        <span className="text-gray-500 mt-2">
          {fileName ? fileName : "Drag & drop file here or click to upload"}
        </span>
        <input
          type="file"
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default function ShelterRequestForm() {
  const [formData, setFormData] = useState({
    shelterName: "",
    location: "",
    applicantName: "John Doe",       
    applicantEmail: "john@example.com",
    phone: "",
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shelter Request Submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-md rounded-md mt-8 pt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Shelter Request Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Shelter Info */}
        <div className="space-y-2">
          <label className="block font-semibold">Shelter Name</label>
          <input
            type="text"
            name="shelterName"
            value={formData.shelterName}
            onChange={handleChange}
            placeholder="Enter shelter name"
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City / Area"
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Applicant Info */}
        <div className="space-y-2">
          <label className="block font-semibold">Applicant Name</label>
          <input
            type="text"
            name="applicantName"
            value={formData.applicantName}
            disabled
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Applicant Email</label>
          <input
            type="email"
            name="applicantEmail"
            value={formData.applicantEmail}
            disabled
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+8801XXXXXXXXX"
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>


        {/* File Uploads */}
        <FileUpload
          label="Shelter Image (Optional)"
          name="proof"
          accept=".pdf,.jpg,.png"
          onChange={handleChange}
        />


        <button
          type="submit"
          className="bg-green-600 px-6 py-2 font-bold rounded-md hover:bg-green-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
