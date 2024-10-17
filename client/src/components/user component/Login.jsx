import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border rounded w-full p-2 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          If you don't have an account,{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-500"
          >
            create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
