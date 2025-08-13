import TwoFactorSetup from "../components/two-factor-setup";
import { useNavigate } from "react-router-dom";

const SetUp2FA = () => {
  const navigate = useNavigate();

  const handleSetupComplete=()=>{
    navigate("/verify-2fa")
  }

  return (
    <div>
      <TwoFactorSetup onSetupComplete={handleSetupComplete} />
    </div>
  );
};

export default SetUp2FA;
