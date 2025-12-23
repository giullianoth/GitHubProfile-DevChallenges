import { useEffect, useState } from "react"
import Repository from "../Repository"
import styles from "./Repositories.module.css"
import type { GitHubRepository } from "../../types/repository"
import APIServices from "../../api/api-services"
import Loading from "../Loading"

type Props = {
    userName: string
}

const Repositories = ({ userName }: Props) => {
    const [repositories, setRepositories] = useState<GitHubRepository[]>([])
    const [viewAll, setViewAll] = useState<boolean>(false)
    const { loading, error, getReposByUser } = APIServices()

    const filteredRepos = repositories.filter((_, index) =>
        viewAll || !viewAll && index < 4)

    useEffect(() => {
        const fetchInitialRepos = async () => {
            const data = await getReposByUser("github")
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
        }, 500)

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

                                {!viewAll && repositories.length > 4 &&
                                    <p className={styles.repos__view}>
                                        <button
                                            className="button clear"
                                            onClick={() => setViewAll(true)}>View all repositories</button>
                                    </p>}
                            </>

                            : <p>No repositories yet.</p>))}
            </div>
        </section>
    )
}

export default Repositories