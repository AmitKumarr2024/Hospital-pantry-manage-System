import React, { useState } from "react";
import useSignup from "../hooks/user/useSignup ";

const Signup = () => {
  const { signup, isLoading, error } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DeliveryPersonnel");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(email, password, role);
      if (data) {
        alert("Signup successful!");
        // Redirect or handle success further (e.g., navigate to login)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
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
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="HospitalManager">Hospital Manager</option>
            <option value="PantryStaff">Pantry Staff</option>
            <option value="DeliveryPersonnel">Delivery Personnel</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
