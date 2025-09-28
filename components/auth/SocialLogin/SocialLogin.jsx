import React from "react";
import { doSocialLogin } from "@/app/actions/index";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div>
      <form action={doSocialLogin}>
        <div className="flex gap-3">
          <button
            type="submit"
            name="action"
            value="google"
            className="btn btn-soft btn-success border border-green-500 flex-1 flex items-center justify-center gap-2"
          >
            <FaGoogle className="w-5 h-5" />
            Google
          </button>

          <button
            type="submit"
            name="action"
            value="facebook"
            className="btn btn-soft btn-success border border-green-500 flex-1 flex items-center justify-center gap-2"
          >
            <FaFacebookF className="w-5 h-5" />
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
