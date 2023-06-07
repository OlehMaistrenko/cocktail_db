'use client'; 
import { signOut } from "next-auth/react";
import { ReactNode } from 'react'

export default function LogOutBtn({ children }: {children:ReactNode}) {
  return (<button onClick={() => signOut()}>{children}</button>)
}