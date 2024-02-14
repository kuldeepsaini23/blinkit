import VerifyEmail from '@/components/core/Auth/VerifyEmail'
import { Metadata } from 'next';
import React from 'react'

type Props = {}

export const metadata: Metadata = {
  title: "Verify",
  description:
    "Verify-Email Page",
  
};

const page = (props: Props) => {
  return (
    <VerifyEmail/>
  )
}

export default page