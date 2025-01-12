import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useLogin from "../hooks/user/useLogin";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { login, isLoading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      if (data) {
        console.log("userRole", data.data);

        const debug = jwtDecode(data.data);

        toast.success("Login successful!");
        const userRole = debug;

        console.log("debug", userRole.role);

        if (userRole.role === "Manager") {
          navigate("/dashboard");
        } else if (userRole.role === "PantryStaff") {
          navigate("/pantry");
        } else if (userRole.role === "DeliveryPersonnel") {
          navigate("/delivery");
        } else {
          null;
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-slate-700 bg-center relative"
     
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg"></div>

      {/* Login Card */}
      <div className="z-10 bg-white bg-opacity-90 rounded-lg shadow-xl p-8 w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-orange-500 hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
