import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function LoginButton() {
  return (
    <Link to="/auth/login">
      <Button className="">Login</Button>
    </Link>
  );
}

export default LoginButton;
