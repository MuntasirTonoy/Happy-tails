"use client";

import RegisterForm from "@/components/auth/Register/RegisterForm";
import SocialLogin from "@/components/auth/SocialLogin/SocialLogin";
import Link from "next/link";
import React from "react";
import { FaPaw } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-2xl  rounded-xl p-8 lg:mt-20 mt-10">
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
          <SocialLogin />
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
