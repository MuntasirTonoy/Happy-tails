"use client";

import React from "react";

export default function RegisterForm() {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Full Name */}
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text text-base-content">Full Name</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          className="input input-bordered w-full placeholder-base-content/60"
          required
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
          placeholder="Enter your email"
          className="input input-bordered w-full placeholder-base-content/60"
          required
        />
      </div>

      {/* Password */}
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text text-base-content placeholder-base-content/60">
            Password
          </span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="input input-bordered w-full placeholder-base-content/60"
          required
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
          placeholder="Confirm your password"
          className="input input-bordered w-full placeholder-base-content/60"
          required
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
          className="file-input file-input-bordered w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="btn bg-green-500 hover:bg-green-600 rounded-md text-white w-full"
        >
          Register
        </button>
      </div>
    </form>
  );
}
