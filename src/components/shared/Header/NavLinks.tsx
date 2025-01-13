import { Link } from "react-router";

export function NavLinks() {
  return (
    <>
      <Link
        to="/about"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        About
      </Link>
      <Link
        to="/services"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Services
      </Link>
      <Link
        to="/booking"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Booking
      </Link>
      <Link
        to="/reviews"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Reviews
      </Link>
    </>
  );
}
