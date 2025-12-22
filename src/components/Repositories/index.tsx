import Repository from "../Repository"
import styles from "./Repositories.module.css"

type Props = {}

const Repositories = ({ }: Props) => {
    return (
        <section className={styles.repos}>
            <div className="container">
                <div className={styles.repos__list}>
                    <Repository />
                    <Repository />
                    <Repository />
                    <Repository />
                </div>

                <p className={styles.repos__view}>
                    <button className="button clear">View all repositories</button>
                </p>
            </div>
        </section>
    )
}

export default Repositories