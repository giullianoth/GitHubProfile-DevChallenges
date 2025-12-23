import type { GitHubRepository } from "../../types/repository"
import { formatRelativeTime } from "../../utils/format-date"
import styles from "./Repository.module.css"
import shieldIcon from "/images/Chield_alt.svg"
import nestingIcon from "/images/Nesting.svg"
import starIcon from "/images/Star.svg"

type Props = {
    repository: GitHubRepository
}

const Repository = ({ repository }: Props) => {
    return (
        <article className={styles.repo}>
            <header className={styles.repo__name}>
                <h2>
                    <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
                        {repository.name}
                    </a>
                </h2>
            </header>

            {repository.description &&
                <p className={styles.repo__description}>
                    <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
                        {repository.description}
                    </a>
                </p>}

            <div className={styles.repo__details}>
                {repository.license &&
                    <div className={styles.repo__detail}>
                        <img src={shieldIcon} alt="" className="image-as-icon" />
                        <p>{repository.license.spdx_id}</p>
                    </div>}

                <div className={styles.repo__detail}>
                    <img src={nestingIcon} alt="" className="image-as-icon" />
                    <p>{repository.forks_count}</p>
                </div>

                <div className={styles.repo__detail}>
                    <img src={starIcon} alt="" className="image-as-icon" />
                    <p>{repository.stargazers_count}</p>
                </div>

                <p className={styles.repo__updatedAt}>
                    updated {formatRelativeTime(repository.updated_at)} ago
                </p>
            </div>
        </article>
    )
}

export default Repository