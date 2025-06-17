import React, { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (name.length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Simulate API request
    setLoading(true);
    setTimeout(() => {
      console.log("Registered user:", formData); // Replace with real API call
      setLoading(false);
      setSuccess("Account created successfully! Please log in.");
      setFormData({ name: "", email: "", password: "" });
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create an Account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center bg-green-100 p-2 rounded">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${loading ? "bg-yellow-300" : "bg-yellow-500 hover:bg-yellow-600"}`}
        >
          {loading ? "Creating Account..." : "Sign In"}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
