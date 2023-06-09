"use client";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

export default function LoginBtn({ children }: { children: ReactNode }) {
  return <button onClick={() => signIn()}>{children}</button>;
}
