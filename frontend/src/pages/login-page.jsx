import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth-form";
import { useSession } from "../contexts/session-context";

const LoginPage = () => {
  const { login } = useSession();
  const navigate=useNavigate()

  const handleLoginSuccess = (userData) => {
    console.log("the logged in user data is : ", userData);
    login(userData);
    if(!userData.isMfaActive){
      // if false the mfa go to setup
      navigate("/setup-2fa")
    }else{
      navigate("/verify-2fa")
    }
  };

  return (
    <div>
      <AuthForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
