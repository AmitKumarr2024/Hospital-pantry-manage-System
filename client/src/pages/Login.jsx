import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/user/useLogin ";

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
        alert("Login successful!");
        // Redirect based on user role or dashboard
        const userRole = data.user.role;
        console.log("userRole", userRole);

        if (userRole === "Manager") {
          navigate("/dashboard");
        } else if (userRole === "PantryStaff") {
          navigate("/pantry");
        } else if (userRole === "DeliveryPersonnel") {
          navigate("/delivery");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
