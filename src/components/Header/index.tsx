import { useEffect, useState, type FormEvent } from "react"
import styles from "./Header.module.css"
import searchIcon from "/images/Search.svg"
import { VscClose } from "react-icons/vsc"
import APIServices from "../../api/api-services"
import type { GitHubUser } from "../../types/user"
import Loading from "../Loading"

type Props = {
    onSelectUser: (value: string) => void
    debounceTimeout: number
}

const Header = ({ onSelectUser, debounceTimeout }: Props) => {
    const [search, setSearch] = useState<string>("")
    const [users, setUsers] = useState<GitHubUser[]>([])
    const { loading, error, searchUsers } = APIServices()

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (search) {
                const data = await searchUsers(search)
                setUsers(data)
            } else {
                setUsers([])
            }
        }, debounceTimeout)

        return () => clearTimeout(delayDebounceFn)
    }, [search, searchUsers])

    const handleSelectOnSubmit = (event: FormEvent) => {
        event.preventDefault()

        if (users.length) {
            onSelectUser(users[0].login)
            setUsers([])
            setSearch("")
        }
    }

    const handleSelectOnClick = (userName: string) => {
        onSelectUser(userName)
        setUsers([])
        setSearch("")
    }

    return (
        <header className={styles.header}>
            <div className="container">
                <form className={styles.header__search} onSubmit={handleSelectOnSubmit}>
                    <img src={searchIcon} alt="" className="image-as-icon" />

                    <input
                        autoComplete="off"
                        type="text"
                        name="search"
                        placeholder="username"
                        value={search}
                        onChange={event => setSearch(event.target.value)} />

                    {search &&
                        <>
                            <span
                                className={styles.header__searchClose}
                                title="Clear"
                                onClick={() => setSearch("")}>
                                <VscClose />
                            </span>

                            <div className={styles.header__results}>
                                {loading
                                    ? <Loading
                                        small
                                        className={`${styles.header__result} ${styles.info}`} />

                                    : (error
                                        ? <p className={`${styles.header__result} ${styles.info}`}>{error}</p>

                                        : (users.length
                                            ? users.map(user => (
                                                <div
                                                    key={user.id}
                                                    className={styles.header__result}
                                                    onClick={() => handleSelectOnClick(user.login)}>
                                                    <img src={user.avatar_url} alt={user.name || user.login} />

                                                    <div className={styles.header__resultInfo}>
                                                        <p className={styles.header__resultName}>
                                                            <strong>{user.name || user.login}</strong>
                                                        </p>

                                                        {user.bio &&
                                                            <p className={styles.header__resultBio}>
                                                                {user.bio}
                                                            </p>}
                                                    </div>
                                                </div>
                                            ))

                                            : <p className={`${styles.header__result} ${styles.info}`}>No results</p>)
                                    )
                                }
                            </div>
                        </>
                    }
                </form>
            </div>
        </header>
    )
}

export default Header