import { FaPaw, FaGoogle, FaFacebookF } from "react-icons/fa";
import LoginForm from "@/components/auth/Login/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin/SocialLogin";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/"); // 👈 already logged in, go home (or dashboard)
  }
  return (
    <div className="bg-base-200 text-base-content min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-xl lg:mt-20 ">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <FaPaw className="w-12 h-12 mx-auto text-green-500" />
          <h1 className="text-3xl font-bold mt-4 ">Welcome to HappyTails</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Log in to find your new best friend.
          </p>
        </div>
        <LoginForm />
        {/* Divider */}
        <div className="mt-6">
          <div className="divider text-gray-500 dark:text-gray-400">
            Or continue with
          </div>
        </div>
        {/* Social Buttons */}
        <SocialLogin />
        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Don't have any account?{" "}
          <Link href="/register" className="text-green-500 hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
