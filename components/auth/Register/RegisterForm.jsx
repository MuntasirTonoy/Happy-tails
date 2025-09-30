"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");
      const profileImage = formData.get("profileImage");

      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        setLoading(false);
        return;
      }

      let imageUrl = null;
      if (profileImage && profileImage.size > 0) {
        const uploadForm = new FormData();
        uploadForm.append("file", profileImage);

        const uploadRes = await axios.post("/api/upload", uploadForm);
        imageUrl = uploadRes.data.url;
      }

      await axios.post("/api/register", {
        name,
        email,
        password,
        profileImage: imageUrl,
      });

      toast.success("User registered successfully!");
      event.target.reset();
      router.push("/login");
    } catch (err) {
      console.error("Register error:", err);
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      onSubmit={handleRegister}
    >
      {/* Full Name */}
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text text-base-content">Full Name</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="write your full name"
          required
          className="input input-bordered text-base-content placeholder-base-content/60"
        />
      </div>

      {/* Email */}
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text text-base-content">Email address</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="write your email"
          required
          className="input input-bordered text-base-content placeholder-base-content/60"
        />
      </div>

      {/* Password */}
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text text-base-content">Password</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="make a password"
          required
          className="input input-bordered text-base-content placeholder-base-content/60"
        />
      </div>

      {/* Confirm Password */}
      <div className="form-control">
        <label htmlFor="confirmPassword" className="label">
          <span className="label-text text-base-content">Confirm Password</span>
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="re-write your password"
          required
          className="input input-bordered text-base-content placeholder-base-content/60"
        />
      </div>

      {/* Profile Image Upload */}
      <div className="form-control md:col-span-2">
        <label htmlFor="profileImage" className="label">
          <span className="label-text text-base-content">Profile Image</span>
        </label>
        <input
          id="profileImage"
          name="profileImage"
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full text-base-content placeholder-base-content/60"
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className={`btn w-full text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
}
