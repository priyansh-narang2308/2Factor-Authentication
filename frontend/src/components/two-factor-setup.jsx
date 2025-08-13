import React, { useEffect, useState } from "react";
import { ShieldCheck, KeyRound, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { setup2FA } from "../service/auth-service-api";

const TwoFactorSetup = ({ onSetupComplete }) => {
  const [response, setResponse] = useState({});

  const handleCopy = () => {
    navigator.clipboard.writeText(response.secret);
    toast.success("Code copied successfully!");
  };

  const fetchQRCode = async () => {
    const data = await setup2FA();
    console.log(data);
    setResponse(data);
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  return (
   <div className="p-[2px] rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
  <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl animate-fadeIn">
    <div className="text-center mb-8">
      <div className="flex justify-center mb-3">
        <ShieldCheck className="text-indigo-500 w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
        Secure Your Account
      </h2>
      <p className="text-gray-500 mt-2 text-base sm:text-lg max-w-sm mx-auto">
        Add an extra layer of protection by enabling Two-Factor Authentication.
      </p>
    </div>

    <div className="mb-8">
      <p className="text-gray-700 font-medium mb-3 text-sm sm:text-base">
        <span className="text-indigo-600 font-semibold">Step 1:</span> Scan this
        QR code using your authenticator app.
      </p>
      <div className="flex justify-center">
        <div className="p-2 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-xl shadow-inner">
          <img
            src={response.qrCode}
            alt="2FA QR Code"
            className="w-40 h-40 sm:w-48 sm:h-48 border-4 border-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    </div>

    <div>
      <p className="text-gray-700 font-medium mb-3 text-sm sm:text-base">
        <span className="text-indigo-600 font-semibold">Step 2:</span> Or enter
        the code manually in your authenticator app.
      </p>
      <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-inner hover:shadow-md transition-all overflow-x-auto">
        <div className="flex items-center min-w-0">
          <KeyRound className="text-indigo-500 mr-2 shrink-0" />
          <span className="font-mono text-sm sm:text-base tracking-wider text-gray-900 break-all">
            {response.secret}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg cursor-pointer bg-indigo-100 hover:bg-indigo-200 transition shrink-0"
          title="Copy Code"
        >
          <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
        </button>
      </div>
    </div>

    <button
      onClick={onSetupComplete}
      className="mt-5 w-full cursor-pointer py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
    >
      Continue to Verification
    </button>
  </div>
</div>

  );
};

export default TwoFactorSetup;
