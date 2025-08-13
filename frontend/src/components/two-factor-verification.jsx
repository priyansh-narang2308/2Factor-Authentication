import React, { useState } from "react";
import { reset2FA, verify2FA } from "../service/auth-service-api";
import { User, AlertCircle, RefreshCw, ShieldCheck } from "lucide-react";

const TwoFactorVerification = ({ onVerifySuccess, onResetSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verify2FA(otp);
      onVerifySuccess(data);
    } catch (error) {
      setOtp("");
      console.log("Error:", error.message);
      setError("Invalid OTP");
    }
  };

  const handleReset = async () => {
    try {
      const { data } = await reset2FA();
      onResetSuccess(data);
    } catch (error) {
      console.log("Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <form
        onSubmit={handleTokenVerification}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 w-full max-w-lg border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 flex justify-center items-center gap-3">
            <ShieldCheck className="text-indigo-500" size={36} />
            Validate TOTP
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Enter your 6-digit time-based OTP to verify 2FA.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            TOTP Code
          </label>
          <div className="flex items-center bg-gray-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">
            <User className="text-gray-400 mr-3" size={24} />
            <input
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter your TOTP"
              className="bg-transparent w-full outline-none text-gray-700 text-lg"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 shadow-sm">
            <AlertCircle size={20} className="text-red-500" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <button
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg py-4 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <ShieldCheck size={20} />
            Verify TOTP
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-gray-800 font-semibold text-lg py-4 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <RefreshCw size={20} />
            Reset 2FA
          </button>
        </div>
      </form>
    </div>
  );
};

export default TwoFactorVerification;
