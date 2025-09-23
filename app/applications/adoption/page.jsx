"use client";

import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";

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
      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md h-32 cursor-pointer hover:border-green-600 transition">
        <AiOutlineUpload className="text-4xl" />
        <span className="mt-2 text-sm">
          {fileName ? fileName : "Upload files or drag and drop (PNG, JPG, PDF up to 10MB)"}
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
    applicationType: "",
    experience: "",
    livingSituation: "",
    reason: "",
    references: "",
    visitDate: "",
    attachment: null,
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
    <div className="max-w-2xl mx-auto p-6 shadow-md rounded-md mt-8 pt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Application Form</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Application Type */}
        <div className="space-y-2">
        <label className="block font-semibold">
            Application Type
        </label>
        <select
            name="applicationType"
            value={formData.applicationType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-gray-400"
            required
        >
            <option value="">Select application type</option>
            <option value="dog">Dog Adoption</option>
            <option value="cat">Cat Adoption</option>
            <option value="other">Other Pet Adoption</option>
        </select>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-semibold">Experience Level</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md text-gray-400"
              required
            >
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Experienced">Experienced</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold">Living Situation</label>
            <select
              name="livingSituation"
              value={formData.livingSituation}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md text-gray-400"
              required
            >
              <option value="">Select</option>
              <option value="Own House with Yard">Own House with Yard</option>
              <option value="Apartment">Apartment</option>
              <option value="Shared Housing">Shared Housing</option>
            </select>
          </div>
        </div>

        {/* Textareas */}
        <div className="space-y-2">
          <label className="block font-semibold">Reason for Adoption</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Please provide a brief explanation of why you want to adopt a pet."
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
            placeholder="Please provide any references that can vouch for your ability to care for a pet."
          />
        </div>

        {/* Date */}
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

        {/* File Upload */}
        <FileUpload
          label="Attachments"
          name="attachment"
          accept=".pdf,.jpg,.png"
          onChange={handleChange}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
            <button
                type="submit"
                className="bg-green-600 px-6 py-2 font-bold rounded-md hover:bg-green-700"
            >
                Submit Application
            </button>
        </div>
      </form>
    </div>
  );
}
