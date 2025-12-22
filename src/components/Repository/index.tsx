import styles from "./Repository.module.css"
import shieldIcon from "/images/Chield_alt.svg"
import nestingIcon from "/images/Nesting.svg"
import starIcon from "/images/Star.svg"

type Props = {}

const Repository = ({ }: Props) => {
    return (
        <article className={styles.repo}>
            <header className={styles.repo__name}>
                <h2>
                    <a href="#" target="_blank" rel="noopener noreferrer">.github</a>
                </h2>
            </header>

            <p className={styles.repo__description}>
                <a href="#" target="_blank" rel="noopener noreferrer">Community health files for the @GitHub organization</a>
            </p>

            <div className={styles.repo__details}>
                <div className={styles.repo__detail}>
                    <img src={shieldIcon} alt="" className="image-as-icon" />
                    <p>MIT</p>
                </div>

                <div className={styles.repo__detail}>
                    <img src={nestingIcon} alt="" className="image-as-icon" />
                    <p>0</p>
                </div>

                <div className={styles.repo__detail}>
                    <img src={starIcon} alt="" className="image-as-icon" />
                    <p>703</p>
                </div>

                <p className={styles.repo__updatedAt}>updated 4 days ago</p>
            </div>
        </article>
    )
}

export default Repository