"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/api/auth/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/auth/authSlice";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log({ email, password });

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Call the signUp API function
      const response = await signUp(email, password);
      const { token, userId } = response;
      dispatch(setAuth({ token, userId }));
      console.log("Signup successful:", response);
      router.push("/dashboard");
    } catch (err: any) {
      // Handle API errors
      console.error("Signup failed:", err.message);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-blue-600 text-center mb-6 transition duration-300 transform hover:scale-105">
          Sign Up
        </h1>
        <form className="mt-4" onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-center font-medium text-red-700">
              {error}
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md font-semibold transition duration-300 hover:bg-blue-700 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-blue-600 underline hover:text-blue-700 transition duration-300"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
