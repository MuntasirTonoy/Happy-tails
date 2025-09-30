"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}

export async function doLogout() {
  await signOut({ redirect: false });
}

export async function doCredentialLogin(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    return result;
  } catch (err) {
    console.error("Login error:", err);
    throw err; // rethrow original error
  }
}
