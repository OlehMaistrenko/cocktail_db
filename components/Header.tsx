import styles from "./Header.module.css";
import LoginBtn from "./user/LoginBtn";
import UserInfo from "./user/UserInfo";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { GET } from "@/app/api/favorites/route";
import CocktailData from "@/types/CocktailData";
import FavoritesLink from "./user/FavoritesLink";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession(authOptions);
  let favCount = 0;
  if (session) {
    const cocktailsData: CocktailData[] = await GET().then((res) => res.json());
    favCount = cocktailsData.length;
  }
  return (
    <header>
      <div className={styles.container}>
        <Link href='/'>Home</Link>
        <FavoritesLink>Favorites</FavoritesLink>
        {session ? (
          <UserInfo
            mail={session.user?.email ? session.user?.email : ""}
            imageUrl={session.user?.image ? session.user?.image : ""}
          />
        ) : (
          <LoginBtn>Log In</LoginBtn>
        )}
      </div>
    </header>
  );
}
