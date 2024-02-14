import Login from '@/components/core/Auth/Login'
import { Metadata } from 'next';
import React from 'react'

type Props = {}

export const metadata: Metadata = {
  title: "Login",
  description:
    "Login page.",
  
};
const page = (props: Props) => {
  return (
    <Login/>
  )
}

export default page