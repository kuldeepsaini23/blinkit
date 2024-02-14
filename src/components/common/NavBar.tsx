"use client"
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";
import Link from "next/link";
import { logout } from "@/services/operations/authApi";

type Props = {};
 
const NavBar = (props: Props) => {
  const token = localStorage.getItem("token");
  return (
    <div className="w-full flex justify-center items-center gap-x-4 flex-wrap">
      <Link href={token ? "/" : '/login'}>
        <Button variant='outline'>
          {token ? "Loged In" : "Login"}
        </Button>
      </Link>

      <ModeToggle />

      <Button variant='outline' onClick={()=>logout()}>
        Logout
      </Button>
    </div>
  );
};

export default NavBar;
