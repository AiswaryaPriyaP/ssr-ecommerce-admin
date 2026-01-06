"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Dummy credentials (as required)
    if (
      email === "admin@demo.com" &&
      password === "admin123"
    ) {
      router.push("/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="border p-8 rounded w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Login
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Demo: admin@demo.com / admin123
        </p>
      </form>
    </main>
  );
}
