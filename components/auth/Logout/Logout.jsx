"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function Logout() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base text-base-content hover:text-green-600 transition-colors"
    >
      <span>Logout</span>
      <FiLogOut className="w-5 h-5" />
    </button>
  );
}
