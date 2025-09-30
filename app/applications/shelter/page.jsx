"use client";

import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

function FileUpload({ name, accept, value, onChange }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
    onChange(e);
  };

  if (!value && fileName) setFileName("");

  return (
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-md h-32 cursor-pointer hover:border-green-600 transition">
      <CiImageOn className="text-4xl text-green-500" />
      <span className="mt-2 text-sm">
        {fileName
          ? fileName
          : "Upload a file or drag and drop (PNG, JPG, GIF up to 10MB)"}
      </span>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}

export default function ShelterRequestForm() {
  const [formData, setFormData] = useState({
    shelterName: "",
    shelterImage: null,
    location: "",
    contactEmail: "",
    contactPhone: "",
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
    const submissionData = { ...formData };

    const submitForm = async () => {
      try {
        const response = await fetch("/api/shelter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });

        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          setFormData({
            shelterName: "",
            shelterImage: null,
            location: "",
            contactEmail: "",
            contactPhone: "",
          });
        } else {
          toast.error(data.message || "Failed to create shelter");
        }
      } catch (err) {
        console.error("Error submitting shelter:", err);
        toast.error("Something went wrong while submitting.");
      }
    };

    if (formData.shelterImage) {
      const file = formData.shelterImage;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        submissionData.shelterImage = reader.result;
        submitForm();
      };
    } else {
      submitForm();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 shadow-md rounded-md mt-8 pt-20">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-2xl font-bold mb-2 text-center">Create a New Shelter</h1>
      <p className="text-center mb-6">
        Help us find more forever homes for pets in need.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block font-semibold">Shelter Name</label>
          <input
            type="text"
            name="shelterName"
            value={formData.shelterName}
            onChange={handleChange}
            placeholder="Happy Paws Shelter"
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>


        <div className="space-y-2">
          <label className="block font-semibold">Shelter Image</label>
          <FileUpload
            name="shelterImage"
            accept=".png,.jpg,.gif"
            value={formData.shelterImage}
            onChange={handleChange}
          />
        </div>

       
        <div className="space-y-2">
          <label className="block font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="123 Kindness St, Anytown, USA"
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        
        <div className="space-y-2">
          <label className="block font-semibold">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="contact@happypaws.org"
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

       
        <div className="space-y-2">
          <label className="block font-semibold">Contact Phone</label>
          <input
            type="text"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

       
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 px-6 py-2 font-bold rounded-md hover:bg-green-700 text-white"
          >
            Create Shelter
          </button>
        </div>
      </form>
    </div>
  );
}
