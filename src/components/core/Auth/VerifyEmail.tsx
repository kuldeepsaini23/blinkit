"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/store/authStore";
import OtpInput from "react-otp-input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Pen } from "lucide-react";
import Link from "next/link";
import { login, sendOtp } from "@/services/operations/authApi";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import toast from "react-hot-toast";

type Props = {};

const VerifyEmail = (props: Props) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { email, loading, setLoading, setToken } = useAuthStore(
    (state) => state
  );
  const { setUser, setIsUserLoggedIn } = useUserStore((state) => state);

  const [seconds, setSeconds] = useState(60);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          clearInterval(interval!);
          setTimerActive(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval!);
  }, [seconds, timerActive]);

  const handleResendClick = () => {
    // Make your API call here to resend the code
    sendOtp(email, setLoading, router, true);
    // Reset the timer
    setSeconds(60);
    setTimerActive(true);
  };

  const handleVerifyAndSignup = (event: any) => {
    event.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    login(email, otp, setLoading, setToken, setUser, setIsUserLoggedIn, router);
  };

  useEffect(() => {
    if (otp.length === 6) {
      login(
        email,
        otp,
        setLoading,
        setToken,
        setUser,
        setIsUserLoggedIn,
        router
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <div className="w-full px-3 sm:px-0 min-h-screen flex justify-center items-center">
      <Card className="sm:w-[450px]">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>
            Verify to access your account in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(event) => handleVerifyAndSignup(event)}
            className="w-full flex flex-col items-center justify-center gap-8"
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
              inputType="number"
              renderInput={(props, idx) => (
                <Input
                  {...props}
                  type="tel" // Opens number keyboard on mobile
                  placeholder="-"
                  key={idx}
                  className="!w-10 h-10 sm:!w-[50px] sm:h-[50px] rounded-full"
                />
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              Verify
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          {/* Resend and Edit*/}
          <div className="w-full flex flex-col gap-4 justify-center items-center">
            {/* OTP Resend */}
            <div className="flex gap-2 items-center justify-center flex-wrap">
              <Button
                onClick={handleResendClick}
                variant="link"
                disabled={seconds > 0}
                className={`font-normal text-base ${
                  seconds > 0 ? "" : "text-green-500"
                }`}
              >
                Resend Code
              </Button>
              {seconds > 0 ? (
                <p className="text-base text-green-500 font-medium flex gap-1 items-center">
                  <Clock className="w-5 h-5 stroke-green-500 stroke-2" />{" "}
                  <span>{seconds} Sec</span>
                </p>
              ) : (
                <></>
              )}
            </div>

            {/* Edit Email */}
            <div className="flex items-center gap-1">
              <Pen className="w-5 h-5 stroke-2" />
              <Link
                href="/login"
                className="text-base text-info-500 font-medium"
              >
                Edit Email
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
