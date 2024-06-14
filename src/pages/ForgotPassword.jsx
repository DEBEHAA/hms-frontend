import ForgotPasswordSendOTP from "@/components/Auth/ForgotPasswordSendOTP";
import ResetPassword from "@/components/Auth/ResetPassword";
import FullpageLoader from "@/components/shared/FullpageLoader";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const { isLoading, user } = useAuth();
  const [mobileNo, setMobileNo] = useState("");
  const [step, setStep] = useState(1);

  if (isLoading) {
    return <FullpageLoader className="size-16" />;
  }

  if (!isLoading && user?._id) {
    toast.error("You are already logged in", {
      description: "Please logout to reset your password",
    });

    return <Navigate to="/" />;
  }

  return (
    <section className="flex min-h-[calc(100vh-140px)] items-center justify-center px-5 py-10 md:py-14">
      <div className="w-full max-w-md rounded-md bg-white p-5">
        <div className="flex min-h-[300px] w-full flex-col justify-center">
          {step === 0 && (
            <ForgotPasswordSendOTP
              mobileNo={mobileNo}
              setMobileNo={setMobileNo}
              setStep={setStep}
            />
          )}
          {step === 1 && <ResetPassword mobileNo={mobileNo} />}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
