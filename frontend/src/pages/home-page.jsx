import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/session-context";
import { ShieldCheck, Lock, LogOut, User } from "lucide-react";
import { logoutUser } from "../service/auth-service-api";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useSession();

  const handleLogout = async () => {
    try {
      const { data } = await logoutUser();
      // by this we remove the user from the session storage
      logout(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen mt-45 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <User className="text-indigo-600" size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome, {user?.username}!
            </h2>
            <p className="text-gray-500">
              Your account is securely protected with Multi-Factor
              Authentication
            </p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4 mb-6">
          <ShieldCheck className="text-green-600" size={28} />
          <div>
            <h3 className="text-lg font-semibold text-green-700">
              2FA Status: Enabled
            </h3>
            <p className="text-sm text-green-600">
              Your account has Time-based One-Time Password (TOTP) protection.
              This ensures only you can access your account.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <Lock className="text-gray-600" size={20} /> Active Session Details
          </h4>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>
              <strong>Username:</strong> {user?.username}
            </li>
            <li>
              <strong>Last Login:</strong> {new Date().toLocaleString()}
            </li>
            <li>
              <strong>Authentication Level:</strong> Multi-Factor Verified
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="w-full cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-lg py-3 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
        >
          <LogOut size={20} />
          Logout Securely
        </button>
      </div>
    </div>
  );
};

export default HomePage;
