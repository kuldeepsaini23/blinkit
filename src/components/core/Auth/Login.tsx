"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/store/authStore";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sendOtp } from "@/services/operations/authApi";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setEmail, loading, setLoading } = useAuthStore((state) => state);
  const router = useRouter();

  const getStarted = (data: any) => {
    setEmail(data.email);
    // Make your API call here to send the code
    sendOtp(data.email, setLoading, router);
  };

  return (
    <div className="w-full px-3 sm:px-0 min-h-screen flex justify-center items-center">
      <Card className="sm:w-[350px]">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>
            Login to access your account in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(getStarted)}
            className="flex flex-col gap-7"
          >
            {/*Email*/}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">
                Email<sup className="text-pink-500">*</sup>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-[12px] text-pink-500">
                  Please enter your Email Address.
                </span>
              )}
            </div>

            <Button type="submit" disabled={loading} variant="outline">
              Get Started
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
