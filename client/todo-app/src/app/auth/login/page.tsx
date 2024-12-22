"use client";
import React, { useState } from "react";
import { setAuth } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await login(email, password);
      const { token, userId } = response;
      dispatch(setAuth({ token, userId }));
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err.message);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-blue-600 text-center mb-6 transition duration-300 transform hover:scale-105">
          Login
        </h1>
        <form className="mt-4" onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-blue-600 underline hover:text-blue-700 transition duration-300"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
