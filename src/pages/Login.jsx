import LoginForm from "@/components/Auth/LoginForm";
import FullpageLoader from "@/components/shared/FullpageLoader";
import useAuth from "@/hooks/useAuth";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) return <FullpageLoader message="Loading..." />;

  if (user) {
    return <Navigate to={`/dashboard/${user.role}`} />;
  }

  return (
    <section>
      <div className="container flex min-h-[calc(100dvh-80px)] flex-col items-center justify-center px-5 py-10 sm:py-14">
        <div className="grid w-full max-w-lg grid-cols-1 rounded-xl bg-white md:max-w-[800px] md:grid-cols-[4fr_3fr] lg:grid-cols-2">
          <div className="px-4 py-8 sm:px-6 md:py-20">
            <h2 className="mb-1 text-2xl font-semibold text-primary sm:text-3xl">
              Log in
            </h2>
            <p className="mb-5 text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                className="text-blue underline hover:no-underline"
                to="/signup"
              >
                Signup
              </Link>
            </p>
            <LoginForm />
            <div className="mt-3 text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue underline hover:no-underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="hidden p-2 md:block">
            <img
              src="/hospital-reception.svg"
              alt="Signup"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
