"use client";
import styles from "./Header.module.css";
import LogOutBtn from "./user/LogOutBtn";
import FavoritesLink from "./user/FavoritesLink";
import Link from "next/link";
import useSession from "@/lib/useSession";

export default function Header() {
  let favCount = 0;

  const user = useSession();

  return (
    <header>
      <div className={styles.container}>
        <Link href='/' prefetch={false}>
          Home
        </Link>
        <FavoritesLink>Favorites</FavoritesLink>
        {user ? (
          <LogOutBtn>Log Out</LogOutBtn>
        ) : (
          <>
            <Link href='/login' prefetch={false}>
              Login
            </Link>
            <Link href='/register' prefetch={false}>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
