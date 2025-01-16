import { Link } from "react-router";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`sticky ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      } transition-all duration-500 bg-background z-50 border-b`}
    >
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold "
        >
          <span className="text-primary">Car</span>Wash
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
