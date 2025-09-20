"use client";

import { useState } from "react";
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
        {/* <AiOutlineUpload className="text-4xl text-gray-400" /> */}
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

export default function AdoptionForm() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    experience: "",
    livingSituation: "",
    reason: "",
    references: "",
    visitDate: "",
    idProof: null,
    homePhoto: null,
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
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-md rounded-md mt-8">
      <h1 className="text-2xl font-bold mb-6">Pet Adoption Application</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Applicant Info */}
        {["name", "email"].map((field) => (
          <div key={field} className="space-y-2">
            <label className="block font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              disabled
              className="w-full border px-3 py-2 rounded-md mt-2"
            />
          </div>
        ))}

        {/* Application Details */}
        <div className="space-y-2">
          <label className="block font-semibold">Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="I have experience raising dogs..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Living Situation</label>
          <textarea
            name="livingSituation"
            value={formData.livingSituation}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Apartment with balcony..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Reason for Adoption</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Why do you want to adopt this pet?"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">References (Optional)</label>
          <textarea
            name="references"
            value={formData.references}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Provide references if any"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Preferred Visit Date</label>
          <input
            type="date"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* File Uploads */}
        <FileUpload
          label="Attachments (Optional)"
          name="proof"
          accept=".pdf,.jpg,.png"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-500 px-6 py-2 font-bold rounded-md hover:bg-green-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
