import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import styles from "./Header.module.css"
import searchIcon from "/images/Search.svg"
import { VscClose } from "react-icons/vsc"
import APIServices from "../../api/api-services"
import type { GitHubUser } from "../../types/user"
import Loading from "../Loading"

type Props = {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}

const Header = ({ search, setSearch }: Props) => {
    const [results, setResults] = useState<GitHubUser[]>([])
    const { loading, error, searchUsers } = APIServices()

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (search) {
                const data = await searchUsers(search)
                setResults(data)
            } else {
                setResults([])
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [search])

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

                    {search &&
                        <div className={styles.header__results}>
                            {loading
                                ? <Loading
                                    small
                                    className={`${styles.header__result} ${styles.info}`} />

                                : (error
                                    ? <p className={`${styles.header__result} ${styles.info}`}>{error}</p>

                                    : (results.length
                                        ? results.map(result => (
                                            <div key={result.id} className={styles.header__result}>
                                                <img src={result.avatar_url} alt={result.name || result.login} />

                                                <div className={styles.header__resultInfo}>
                                                    <p className={styles.header__resultName}>
                                                        <strong>{result.name || result.login}</strong>
                                                    </p>

                                                    <p className={styles.header__resultBio}>
                                                        {result.bio || <em>No bio available</em>}
                                                    </p>
                                                </div>
                                            </div>
                                        ))

                                        : <p className={`${styles.header__result} ${styles.info}`}>No results</p>)
                                )
                            }
                        </div>
                    }
                </form>
            </div>
        </header>
    )
}

export default Header