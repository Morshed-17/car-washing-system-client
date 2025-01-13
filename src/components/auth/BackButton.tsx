import { Link } from "react-router";
import { Button } from "../ui/button";

interface backButtonProps {
  label: string;
  href: string;
}

const BackButton = ({ label, href }: backButtonProps) => {
  return (
    <Button className="font-normal w-full" size="sm" variant="link" asChild>
      <Link to={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
