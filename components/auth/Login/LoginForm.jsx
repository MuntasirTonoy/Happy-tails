"use client";

import { doCredentialLogin } from "@/app/actions/index.js";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const { update } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Login successful!");
        await update(); // refresh session
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">Email address</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="input input-bordered w-full pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`btn w-full text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
