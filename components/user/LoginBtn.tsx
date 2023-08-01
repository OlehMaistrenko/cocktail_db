"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function LoginBtn({ children }: { children: ReactNode }) {
  const router = useRouter();
  return <button onClick={() => router.push("/login")}>{children}</button>;
}
