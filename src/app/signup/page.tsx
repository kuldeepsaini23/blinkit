import Signup from '@/components/core/Auth/Signup'
import { Metadata } from 'next';
import React from 'react'

type Props = {}

export const metadata: Metadata = {
  title: "Signup",
  description:
    "Signup page.",
  
};
const page = (props: Props) => {
  return (
    <Signup/>
  )
}

export default page