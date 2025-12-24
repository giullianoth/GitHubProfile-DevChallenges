import { useEffect, useState } from "react"
import Repository from "../Repository"
import styles from "./Repositories.module.css"
import type { GitHubRepository } from "../../types/repository"
import APIServices from "../../api/api-services"
import Loading from "../Loading"

const MAX_REPOS_TO_SHOW = 4

type Props = {
    userName: string
    debounceTimeout: number
    initialUser: string
}

const Repositories = ({ userName, debounceTimeout, initialUser }: Props) => {
    const [repositories, setRepositories] = useState<GitHubRepository[]>([])
    const [viewAll, setViewAll] = useState<boolean>(false)
    const { loading, error, getReposByUser } = APIServices()

    const filteredRepos = repositories.filter((_, index) => viewAll || !viewAll && index < MAX_REPOS_TO_SHOW)

    useEffect(() => {
        const fetchInitialRepos = async () => {
            const data = await getReposByUser(initialUser)
            setRepositories(data)
        }

        fetchInitialRepos()
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (userName) {
                setViewAll(false)
                const data = await getReposByUser(userName)
                setRepositories(data)
            }
        }, debounceTimeout)

        return () => clearTimeout(delayDebounceFn)
    }, [userName, getReposByUser])

    return (
        <section className={styles.repos}>
            <div className="container">
                {loading
                    ? <Loading />
                    : (error
                        ? <p>{error}</p>

                        : (filteredRepos.length
                            ? <>
                                <div className={styles.repos__list}>
                                    {filteredRepos.map(repo => (
                                        <Repository
                                            key={repo.id}
                                            repository={repo} />
                                    ))}
                                </div>

                                {!viewAll && repositories.length > MAX_REPOS_TO_SHOW &&
                                    <p className={styles.repos__view}>
                                        <button
                                            className="button clear"
                                            onClick={() => setViewAll(true)}>
                                                <strong>View all repositories</strong>
                                            </button>
                                    </p>}
                            </>

                            : <p>No repositories yet.</p>))}
            </div>
        </section>
    )
}

export default Repositories