import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import styles from "./Header.module.css"
import searchIcon from "/images/Search.svg"
import { VscClose } from "react-icons/vsc"
import APIServices from "../../api/api-services"

type Props = {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}

const Header = ({ search, setSearch }: Props) => {
    const [results, setResults] = useState([])
    const { loading, searchUsers } = APIServices()

    useEffect(() => {
        const getResults = async () => {
            if (search) {
                const data = await searchUsers(search)
                setResults(data)
            } else {
                setResults([])
            }
        }

        getResults()
    }, [search])

    console.log(results)

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
                        (loading
                            ? <>Loading...</>

                            : (
                                results.length > 0
                                    ? results.map(result => (
                                        <div key={result.id} className={styles.header__results}>
                                            <div className={styles.header__result}>
                                                <img src={result.avatar_url} alt="GitHub" />

                                                <div className={styles.header__resultInfo}>
                                                    <p className={styles.header__resultName}>
                                                        <strong>GitHub</strong>
                                                    </p>

                                                    <p className={styles.header__resultBio}>How people build software.</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                    : <>No results</>
                            )
                        )}
                </form>
            </div>
        </header>
    )
}

export default Header