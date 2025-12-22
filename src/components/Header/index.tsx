import styles from "./Header.module.css"
import searchIcon from "/images/Search.svg"

type Props = {}

const Header = ({}: Props) => {
  return (
    <header className={styles.header}>
        <div className="container">
            <div className={styles.header__search}>
                <img src={searchIcon} alt="" className="image-as-icon" />
                <input type="text" name="search" placeholder="username" />
            </div>
        </div>
    </header>
  )
}

export default Header