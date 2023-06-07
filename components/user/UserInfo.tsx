import styles from './UserInfo.module.css'
import Image from 'next/image'
import LogOutBtn from './LogOutBtn'

export default function UserInfo({ mail, imageUrl }: {mail:string, imageUrl:string}) {
  return (<div className={styles.wrap}>
    <div className={styles.image}>
      <Image src={imageUrl} width={50} height={50} alt="" />
    </div>
    <div className={styles.name}>
    {mail}</div>
    <div>
      <LogOutBtn>Logout</LogOutBtn>
    </div>
  </div>)
}