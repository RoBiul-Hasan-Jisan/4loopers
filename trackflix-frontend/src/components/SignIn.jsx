import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignIn = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Firebase signup
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("Account created successfully!");

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image/hero1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <ToastContainer position="top-center" />

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl relative"
        >
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Close and go to home"
          >
            <FaTimes />
          </button>

          {/* Logo */}
          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <img
              src="/images/lo.jpg"
              alt="Trackflix Logo"
              className="w-[10rem] sm:w-[15rem] h-auto object-contain"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 text-black bg-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-yellow-600 peer-valid:top-1 peer-valid:text-xs">
                Full Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 text-black bg-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-yellow-600 peer-valid:top-1 peer-valid:text-xs">
                Email Address
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 text-black bg-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-yellow-600 peer-valid:top-1 peer-valid:text-xs">
                Password
              </label>
              <div
                className="absolute right-4 top-4 text-gray-500 cursor-pointer hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 text-black bg-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-yellow-600 peer-valid:top-1 peer-valid:text-xs">
                Confirm Password
              </label>
              <div
                className="absolute right-4 top-4 text-gray-500 cursor-pointer hover:text-gray-800"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded transition"
            >
              Create Account
            </button>
          </form>

          <div className="my-6 border-t border-gray-300 text-center text-sm text-gray-500">
            or sign up with
          </div>

          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm">
              <FaGoogle /> Google
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
              <FaFacebook /> Facebook
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Log in here
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
