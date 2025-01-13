import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <section className="w-full">
      <div className="h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
