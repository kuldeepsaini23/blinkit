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
import CountryCode from "@/lib/countrycode.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { singup } from "@/services/operations/authApi";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";

type Props = {};

const Signup = (props: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, setLoading } = useAuthStore((state) => state);
  const { setIsUserLoggedIn, setUser } = useUserStore((state) => state);

  const onBoarding = (data: any) => {
    console.log(data);
    singup(data, setLoading, setUser, setIsUserLoggedIn, router);
  };

  return (
    <div className="w-full px-3 sm:px-0 min-h-screen flex justify-center items-center">
      <Card className="sm:w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Complete your profile to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onBoarding)}
            className="flex flex-col gap-7"
          >
            {/*name*/}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">
                Name<sup className="text-pink-500">*</sup>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-[12px] text-pink-500">
                  Please enter your name.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="lable-style" htmlFor="phonenumber">
                Phone No<sup className="text-pink-500">*</sup>
              </Label>

              <div className="flex gap-5">
                {/* Dropdown */}
                <div className="flex w-[81px] flex-col gap-2">
                  <select
                    {...register("phoneNumberExt")}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                  >
                    {CountryCode.map((element, index) => {
                      return (
                        <option key={index} value={element.code}>
                          {element.code} -{element.country}
                        </option>
                      );
                    })}
                  </select>
               
                </div>

                {/* phone number */}
                <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                  <Input
                    id="phoneNumber"
                    type="number"
                    placeholder="Enter your phone number"
                    className="form-style"
                    {...register("phoneNumber", {
                      required: {
                        value: true,
                        message: "Please Enter Your Phone Number",
                      },
                      maxLength: { value: 11, message: "Invalid Phone Number" },
                      minLength: { value: 8, message: "Invalid Phone Number" },
                    })}
                  />
                </div>
              </div>
              {errors.phoneNumber && (
                <span className="-mt-1 text-[12px] text-pink-500">
                  {errors.phoneNumber.message as string}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="lable-style">
                Address<sup className="text-pink-500">*</sup>
              </label>
              <Textarea
                id="address"
                placeholder="Enter your address"
                {...register("address", { required: true })}
                className="form-style"
              />
              {errors.address && (
                <span className="-mt-1 text-[12px] text-pink-500">
                  Please enter your address
                </span>
              )}
            </div>

            <Button type="submit" disabled={loading} variant="outline">
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
