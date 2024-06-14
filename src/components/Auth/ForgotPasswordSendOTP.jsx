import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/db/auth";
import { toast } from "sonner";

const ForgotPasswordSendOTP = ({ setStep, mobileNo, setMobileNo }) => {
  const handleSendOtp = async () => {
    if (!mobileNo) {
      return toast.error("Please enter your mobile no.");
    }

    if (mobileNo.length !== 11) {
      return toast.error("Please enter a valid mobile no.");
    }

    const toastId = toast.loading("Sending OTP...");

    const result = await forgotPassword(mobileNo);

    if (result.status === "success") {
      toast.success("OTP sent successfully", {
        id: toastId,
      });

      return setStep(1);
    }

    toast.error(result.message || "Failed to send OTP", {
      id: toastId,
    });
  };

  return (
    <div className="mx-auto flex max-w-xs flex-col items-center text-center">
      <h2 className="mb-1 text-lg font-semibold text-gray-800">
        Forgot Password
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        Enter your mobile no. below and we'll send you a OTP to reset your
        password
      </p>
      <Input
        placeholder="Enter your mobile no."
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value)}
        className="mb-3 py-[22px]"
      />
      <Button
        onClick={handleSendOtp}
        className="w-full bg-blue hover:bg-blue/90"
      >
        Send OTP
      </Button>
    </div>
  );
};

export default ForgotPasswordSendOTP;
