import styles from './Header.module.css';
import LoginBtn from './user/LoginBtn';
import UserInfo from './user/UserInfo';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header>
      <div className={styles.container}>
        {session?<UserInfo mail={session.user?.email?session.user?.email:""} imageUrl={session.user?.image?session.user?.image:""} />:<LoginBtn>Log in with Google</LoginBtn>}
      </div>
    </header>
  );
}
