"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function FavoritesLink({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <Link href='/favorites' prefetch={false}>
      {children}
    </Link>
  );
}
