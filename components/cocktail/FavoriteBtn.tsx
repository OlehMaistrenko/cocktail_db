import styles from './FavoriteBtn.module.css'
export default function FavoriteBtn({ isFavorite, onClick, count }: { isFavorite?: boolean, onClick: (e: React.MouseEvent<HTMLElement>) => void, count?: number }) {
  return (
    <div className={`${styles.btn} ${count ? styles.withCount : ""}`} onClick={onClick}>
      <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M24 42.7l-2.9-2.63C10.8 30.72 4 24.55 4 17 4 10.83 8.83 6 15 6c3.48 0 6.82 1.62 9 4.17C26.18 7.62 29.52 6 33 6c6.17 0 11 4.83 11 11 0 7.55-6.8 13.72-17.1 23.07L24 42.7z" strokeWidth="2" stroke="white" fill={isFavorite?"white":"transparent"}/></svg>
      {count && <span className={styles.count}>{ count}</span>}
    </div>
  )
  
}