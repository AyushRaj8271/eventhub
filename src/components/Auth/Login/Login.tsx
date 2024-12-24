import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Loader: React.FC = () => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <p className="text-white text-xl">Loading...</p>
  </div>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string) => {
    return password.length > 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "username":
        setErrors({ ...errors, username: value ? "" : "Username is required" });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value) ? "" : "Password is required",
        });
        break;
      default:
        break;
    }
  };

  const isFormValid = () => {
    return (
      formData.username &&
      formData.password &&
      !errors.username &&
      !errors.password
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigate("/events"); // Redirect to the Products listing page
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 flex items-center justify-center min-h-screen">
      {loading && <Loader />}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-black rounded-full h-12 w-12"></div>
        </div>
        <h2 className="text-center text-2xl font-bold mb-2">Login</h2>
        <p className="text-center text-gray-500 mb-6">
          Welcome to smart investment
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 w-full"
              placeholder="Username"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username}</span>
            )}
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={!isFormValid() || loading}
            className="bg-black text-white rounded-lg px-4 py-2 w-full"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-black font-bold">
            Sign Up
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
