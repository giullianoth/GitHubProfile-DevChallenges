import styles from "./Profile.module.css"

type Props = {}

const Profile = ({ }: Props) => {
    return (
        <section className={styles.profile}>
            <div className="container">
                <div className={styles.profile__details}>
                    <div className={styles.profile__photo}>
                        <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt="GitHub" />
                    </div>

                    <div className={styles.profile__stats}>
                        <div className={styles.profile__statusCard}>
                            <span>Followers</span>
                            <span>65244</span>
                        </div>

                        <div className={styles.profile__statusCard}>
                            <span>Following</span>
                            <span>0</span>
                        </div>

                        <div className={styles.profile__statusCard}>
                            <span>Location</span>
                            <span>San Francisco, CA</span>
                        </div>
                    </div>
                </div>

                <div className={styles.profile__user}>
                    <header className={styles.profile__userName}>
                        <h1>GitHub</h1>
                    </header>

                    <p className={styles.profile__userBio}>How people build software.</p>
                </div>
            </div>
        </section>
    )
}

export default Profile