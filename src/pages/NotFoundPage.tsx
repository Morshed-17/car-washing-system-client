import React from "react";
import { Link } from "react-router";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500  rounded hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
