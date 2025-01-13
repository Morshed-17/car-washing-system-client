import { Button } from "@/components/ui/button";
import { NavLinks } from "./NavLinks";
import { ModeToggle } from "@/components/mode-toggle";

export function DesktopNav() {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <NavLinks />
      <Button>Login</Button>
      <ModeToggle/>
    </div>
  );
}
