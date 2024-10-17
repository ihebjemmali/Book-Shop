import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [image, setImage] = useState(
    "https://tl.vhv.rs/dpng/s/580-5805713_monkey-emoji-transparent-3-monkeys-emoji-png-png.png"
  );

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = () => {
    setImage(
      "https://th.bing.com/th/id/OIP.uCubzrhbfOezWBJ9dgeq_gAAAA?rs=1&pid=ImgDetMain"
    );
  };

  const handleBlur = () => {
    setImage(
      "https://tl.vhv.rs/dpng/s/580-5805713_monkey-emoji-transparent-3-monkeys-emoji-png-png.png"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        navigate("/someProtectedRoute");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md"
      >
        <img src={image} alt="Avatar" className="w-24 h-24 mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-700">
          Welcome Back
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg w-full p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="border border-gray-300 rounded-lg w-full p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-4 rounded-lg w-full hover:bg-indigo-500 transition duration-200"
        >
          Login
        </button>
        <p className="text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:underline"
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
