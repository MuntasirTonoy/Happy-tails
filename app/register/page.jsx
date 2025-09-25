"use client";

import RegisterForm from "@/components/auth/Register/RegisterForm";
import Link from "next/link";
import React from "react";
import { FaPaw, FaGoogle, FaFacebookF } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-2xl bg-base-100 shadow-md rounded-xl p-8 lg:mt-20 mt-10">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <FaPaw className="w-12 h-12 mx-auto text-green-500" />
          <h1 className="text-3xl text-base-content font-bold mt-4">
            Welcome to HappyTails
          </h1>
          <p className="text-base-content ">Register a new account</p>
        </div>

        {/* Form */}
        <RegisterForm />

        {/* Divider */}
        <div className="mt-6">
          <div className="divider text-gray-500 dark:text-gray-400">
            Or continue with
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="btn  btn-soft btn-success border border-green-500 w-full flex items-center gap-2">
              <FaGoogle className="w-5 h-5" />
              Google
            </button>

            <button className="btn  btn-soft btn-success border border-green-500 w-full flex items-center gap-2 ">
              <FaFacebookF className="w-5 h-5" />
              Facebook
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-green-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
