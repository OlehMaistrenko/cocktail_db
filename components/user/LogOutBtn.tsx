"use client";
import { ReactNode } from "react";
import { apiLogoutUser } from "@/lib/api-requests";
import useStore from "@/store";
import { useRouter } from "next/navigation";

export default function LogOutBtn({ children }: { children: ReactNode }) {
  const store = useStore();

  const router = useRouter();
  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      await apiLogoutUser();
    } catch (error) {
    } finally {
      store.reset();
      router.push("/login");
    }
  };
  return <button onClick={handleLogout}>{children}</button>;
}
