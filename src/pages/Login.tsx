import { LoginForm } from "@/components/auth/LoginForm";
import { useLocation } from "react-router";

const Login = () => {
  const location = useLocation()
  return (
    <div>
      <LoginForm redirect={location?.state}/>
    </div>
  );
};

export default Login;
