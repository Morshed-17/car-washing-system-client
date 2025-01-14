import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { logout } from "@/redux/features/userSlice";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
// Assuming you have a logout action

function LoginButton() {
  const { user, token } = useAuth();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.warning("Logged Out");
  };

  if (token && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback>
              {user.name ? user.name[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to={user.role === "admin" ? "/dashboard" : "/profile"}>
              <User className="mr-2 h-4 w-4" />
              {user.role === "admin" ? "Dashboard" : "Profile"}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link to="/auth/login">
      <Button>Login</Button>
    </Link>
  );
}

export default LoginButton;
