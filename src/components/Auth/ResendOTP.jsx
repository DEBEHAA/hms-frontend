import { resendVerificationOTP } from "@/db/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const initialTimer = 60;

const ResendOTP = ({ isLoading, setIsLoading, mobileNo }) => {
  const [timer, setTimer] = useState(initialTimer);
  const duration = `${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`;

  const handleResendOTP = async () => {
    setTimer(60);
    setIsLoading(true);

    const toastId = toast.loading("Resending OTP...", {
      description: "Please wait while we resend the OTP.",
    });

    const result = await resendVerificationOTP(mobileNo);

    if (result.status === "success") {
      toast.success("OTP has been resent successfully.", {
        id: toastId,
        description: "Please check your phone for the new OTP.",
      });
    } else {
      toast.error("Failed to resend OTP.", {
        id: toastId,
        description: result.message || "Please try again later.",
      });
    }

    setIsLoading(false);
    setTimer(initialTimer);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) {
        clearInterval(interval);
        return;
      }

      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Button
      onClick={handleResendOTP}
      className="py-[22px]"
      variant="outline"
      disabled={isLoading || timer > 0}
    >
      Resend OTP {timer > 0 ? `in ${duration}` : ""}
    </Button>
  );
};

export default ResendOTP;
