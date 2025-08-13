import { useState } from "react";
import {
  User,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle2,
  EyeOff,
  Eye,
} from "lucide-react";
import { loginUser, registerUser } from "../service/auth-service-api";

const AuthForm = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser(username, password);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      setError("");
      onLoginSuccess(data);
    } catch (error) {
      console.error("The error is : ", error.message);
      setUsername("");
      setPassword("");
      setMessage("");
      setError("Invalid Login Credentials");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = await registerUser(username, password);
      setIsRegister(false);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.error("The error is : ", error.message);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setMessage("");
      setError("Something went wrong during user registration");
    }
  };

  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
    setError("");
    setMessage("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px] rounded-3xl shadow-2xl w-full max-w-xl mx-auto">
      <form
        onSubmit={isRegister ? handleRegister : handleLogin}
        className="bg-white rounded-3xl shadow-xl p-12"
      >
        <div className="text-center mb-10">
          <h2 className="text-5xl font-extrabold text-gray-900">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            {isRegister
              ? "Join us and explore amazing features"
              : "We are glad to see you again"}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Username
            </label>
            <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">
              <User className="text-gray-400 mr-3" size={24} />
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter your username"
                className="bg-transparent w-full outline-none text-gray-700 text-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Password
            </label>
            <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">
              <Lock className="text-gray-400 mr-3" size={24} />
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="bg-transparent w-full outline-none text-gray-700 text-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition ml-2"
              >
                {showPassword ? (
                  <EyeOff className="cursor-pointer" size={22} />
                ) : (
                  <Eye className="cursor-pointer" size={22} />
                )}
              </button>
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-lg">
                Confirm Password
              </label>
              <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">
                <Lock className="text-gray-400 mr-3" size={24} />
                <input
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="bg-transparent w-full outline-none text-gray-700 text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600 transition ml-2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="cursor-pointer" size={22} />
                  ) : (
                    <Eye className="cursor-pointer" size={22} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="flex mt-10 items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 shadow-sm">
            <AlertCircle size={20} className="text-red-500" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {message && (
          <div className="flex items-center gap-3 mt-10 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 shadow-sm">
            <CheckCircle2 size={20} className="text-green-500" />
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        <div className="mt-10">
          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-xl py-5 rounded-2xl shadow-md hover:scale-[1.02] transition-all duration-200"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </div>

        <div className="mt-8 text-center text-lg text-gray-500">
          {isRegister ? (
            <>
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={handleRegisterToggle}
                className="font-semibold hover:underline cursor-pointer text-indigo-500 hover:text-indigo-600 transition"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <span>Don’t have an account? </span>
              <button
                type="button"
                onClick={handleRegisterToggle}
                className="font-semibold hover:underline cursor-pointer text-indigo-500 hover:text-indigo-600 transition"
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
