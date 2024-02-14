"use client"
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";
import Link from "next/link";
import useUserStore from "@/store/userStore";

type Props = {};

const NavBar = (props: Props) => {
  const {isUserLoggedIn} = useUserStore(state=>state);
  return (
    <div className="w-full flex justify-center items-center gap-x-4">
      <Link href={isUserLoggedIn ? "/" : '/login'}>
        <Button variant='outline'>
          {isUserLoggedIn ? "Loged In" : "Login"}
        </Button>
      </Link>

      <ModeToggle />
    </div>
  );
};

export default NavBar;
