import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import styles from "./Header.module.css"
import searchIcon from "/images/Search.svg"
import { VscClose } from "react-icons/vsc"

type Props = {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}

const Header = ({ search, setSearch }: Props) => {
    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    return (
        <header className={styles.header}>
            <div className="container">
                <form className={styles.header__search}>
                    <img src={searchIcon} alt="" className="image-as-icon" />

                    <input
                        autoComplete="off"
                        type="text"
                        name="search"
                        placeholder="username"
                        value={search}
                        onChange={handleChangeSearch} />

                    {search &&
                        <span
                            className={styles.header__searchClose}
                            title="Clear"
                            onClick={() => setSearch("")}>
                            <VscClose />
                        </span>}

                    <div className={styles.header__results}>
                        <div className={styles.header__result}>
                            <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt="GitHub" />

                            <div className={styles.header__resultInfo}>
                                <p className={styles.header__resultName}>
                                    <strong>GitHub</strong>
                                </p>

                                <p className={styles.header__resultBio}>How people build software.</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </header>
    )
}

export default Header