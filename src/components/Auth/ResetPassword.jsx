import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resetPassword } from "@/db/auth";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ResetPassword = ({ mobileNo }) => {
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleResetPassword = async () => {
    if (!otpValue || !newPassword || !confirmNewPassword) {
      return toast.error("Please fill all the fields");
    }

    if (otpValue.length !== 6) {
      return toast.error("Please enter a valid OTP");
    }

    if (newPassword.length < 8 || confirmNewPassword.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    if (newPassword !== confirmNewPassword) {
      return toast.error("Passwords do not match");
    }

    const toastId = toast.loading("Resetting password...");

    const result = await resetPassword({
      mobileNo,
      otp: otpValue,
      newPassword,
      confirmNewPassword,
    });

    if (result.status === "success") {
      toast.success("Password reset successfully", {
        id: toastId,
        description: "You can now login with your new password",
      });

      return navigate("/login");
    } else {
      toast.error(result.message || "Failed to reset password", {
        id: toastId,
      });
    }
  };

  return (
    <div className={"mx-auto flex max-w-xs flex-col items-center text-center"}>
      <h2 className="mb-1 text-lg font-semibold text-gray-800">
        Reset Password
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        Please enter the OTP sent to your phone number and set a new password
      </p>
      <div className="items-center-center flex flex-col gap-3">
        <div>
          <p className="mb-1 text-left text-sm font-medium text-gray-500">
            OTP
          </p>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otpValue}
            onChange={(value) => setOtpValue(value)}
          >
            <InputOTPGroup className="">
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <InputOTPSlot
                    className="h-12 w-12 text-base font-medium"
                    index={index}
                    key={index}
                  />
                );
              })}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div>
          <p className="mb-1 text-left text-sm font-medium text-gray-500">
            New Password
          </p>
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            className="py-[22px]"
          />
        </div>
        <div>
          <p className="mb-1 text-left text-sm font-medium text-gray-500">
            Confirm New Password
          </p>
          <Input
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            type="password"
            className="py-[22px]"
          />
        </div>
        <Button
          onClick={handleResetPassword}
          className="w-full bg-blue hover:bg-blue/90"
        >
          Send OTP
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
