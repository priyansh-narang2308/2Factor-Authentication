import { useNavigate } from "react-router-dom";
import TwoFactorVerification from "../components/two-factor-verification";

const Verify2FA = () => {
  const navigate = useNavigate();

  const handleVerification = async (data) => {
    // Completed the verifucation
    if (data) {
      navigate("/");
    }
  };
  const handle2FAReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };

  return (
    <div>
      <TwoFactorVerification
        onVerifySuccess={handleVerification}
        onResetSuccess={handle2FAReset}
      />
    </div>
  );
};

export default Verify2FA;
