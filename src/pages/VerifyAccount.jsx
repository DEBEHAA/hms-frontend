import ResendOTP from "@/components/Auth/ResendOTP";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Skeleton } from "@/components/ui/skeleton";
import { verifyAccount } from "@/db/auth";
import useAuth from "@/hooks/useAuth";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const VerifyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  if (!searchParams.has("phone") || searchParams.get("phone") === "") {
    return <Navigate to="/" />;
  }

  const { user, isLoading: isUserFetching } = useAuth();

  if (user?.isVerified) {
    return <Navigate to="/" />;
  }

  const handleVerification = async () => {
    if (otpValue.length !== 6) {
      return toast.error("Please enter a valid OTP.", {
        type: "error",
        description: "The OTP must be a 6-digit number.",
      });
    }

    setIsLoading(true);
    const data = {
      mobileNo: searchParams.get("phone"),
      otp: Number(otpValue),
    };

    const result = await verifyAccount(data);
    setIsLoading(false);

    if (result.error || result.status === "fail") {
      return toast.error("Failed to verify account.", {
        type: "error",
        description: result.error || result.message,
      });
    }

    toast("Account verified successfully.", {
      type: "success",
      description: "You can now login to your account.",
    });

    return navigate("/login");
  };

  if (isUserFetching) {
    return (
      <section className="flex min-h-[calc(100dvh-80px)] w-full items-center justify-center">
        <div className="flex w-full max-w-[445px] flex-col items-center rounded-md border bg-white p-5">
          <Skeleton className="mb-3 h-5 w-[200px]" />
          <Skeleton className="mb-1 h-3 w-10/12" />
          <Skeleton className="mb-5 h-3 w-8/12" />
          <div className="mb-2 grid grid-cols-6 gap-0.5">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="size-11" />
            ))}
          </div>
          <Skeleton className="mb-5 h-3 w-8/12" />
          <Skeleton className="mb-1.5 h-10 w-[274px]" />
          <Skeleton className="h-10 w-[274px]" />
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100dvh-80px)] items-center justify-center px-5 py-10">
      <div className="max-w-md rounded-lg border bg-white p-5 text-center">
        <h3 className="mb-1 text-xl font-semibold">Account Verification</h3>
        <p className="mb-6 text-sm text-gray-500">
          A 6-digit OTP has been sent to your phone number. Please enter the OTP
          below to verify your account.
        </p>
        <div className="flex justify-center">
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
        <div className="mb-5 mt-2 text-sm text-gray-500">
          {otpValue === "" ? (
            <>Please enter the OTP sent to your phone.</>
          ) : (
            <>
              You entered: <span className="text-black">{otpValue}</span>
            </>
          )}
        </div>
        <div className="mx-auto flex max-w-[284px] flex-col gap-2">
          <Button
            onClick={handleVerification}
            className="bg-blue py-[22px] hover:bg-blue/90"
            disabled={isLoading}
          >
            Verify OTP
          </Button>
          <ResendOTP
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            mobileNo={searchParams.get("phone")}
          />
        </div>
      </div>
    </section>
  );
};

export default VerifyAccount;
