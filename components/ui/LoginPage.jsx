import React from "react";
import { FaPaw, FaGoogle, FaFacebookF } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="bg-base-200 text-base-content min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <FaPaw className="w-12 h-12 mx-auto text-green-500" />
          <h1 className="text-3xl font-bold mt-4 ">Welcome to HappyTails</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to find your new best friend.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email address</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full "
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text ">Password</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full "
              required
            />
            <label className="label mt-2 justify-end">
              <a
                href="#"
                className="label-text-alt text-green-500 hover:underline "
              >
                Forgot your password?
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="btn bg-green-500 rounded-md text-white w-full"
          >
            Log in
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6">
          <div className="divider text-gray-500 dark:text-gray-400">
            Or continue with
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="btn  border-1 border-green-500 w-full flex items-center gap-2">
              <FaGoogle className="w-5 h-5" />
              Google
            </button>
            <button className="btn  border-1 border-green-500  w-full flex items-center gap-2">
              <FaFacebookF className="w-5 h-5" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
