import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

import { cookies } from 'next/headers'
import Logout from "./Logout";
 
async function getCookieData() {
  const cookieData = cookies().getAll()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}
 
const NavBar = async(props: Props) => {
  const cookieData = await getCookieData() as any[];
  const token = cookieData?.filter((cookie: any) => cookie.name === "token")[0]?.value;
  // console.log(token)
  return (
    <div className="w-full flex justify-center items-center gap-x-4 flex-wrap">
      <Link href={token ? "/" : '/login'}>
        <Button variant='outline'>
          {token ? "Loged In" : "Login"}
        </Button>
      </Link>

      <ModeToggle />

    <Logout/>
    </div>
  );
};

export default NavBar;
