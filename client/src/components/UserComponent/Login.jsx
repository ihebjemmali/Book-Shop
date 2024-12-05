import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

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
    setError("");
    try {
      const response = await fetch("http://localhost:3004/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.text();
      const statusCode = response.status;
      if (statusCode === 200) {
        navigate("/home");
      } else {
        setError(data);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error);
    }
  };

  return (
    <div className="bg-book-background flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="book-card">
          <img
            className="mx-auto h-12 w-auto"
            src="https://www.svgrepo.com/show/499664/user-happy.svg"
            alt="User Avatar"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-book-primary">
            Sign in to your account
          </h2>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
          <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-book-text"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  className="input-field w-full"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-book-text"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="input-field w-full"
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn-primary w-full">
                Sign In
              </button>
            </div>
          </form>
          <p className="text-center mt-4 text-book-text">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-book-secondary hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
