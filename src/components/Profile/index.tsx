import { useEffect, useState } from "react"
import styles from "./Profile.module.css"
import type { GitHubUser } from "../../types/user"
import APIServices from "../../api/api-services"
import Loading from "../Loading"

type Props = {}

const Profile = ({ }: Props) => {
    const [currentUser, setCurrentUser] = useState<GitHubUser | null>(null)
    const { loading, error, getUser } = APIServices()

    useEffect(() => {
        const fetchInitialUser = async () => {
            const data = await getUser("github")
            setCurrentUser(data)
        }

        fetchInitialUser()
    }, [])

    return (
        loading
            ? <Loading className={styles.profile__info} />

            : (error
                ? <p className={styles.profile__info}>{error}</p>

                : currentUser &&
                <section className={styles.profile}>
                    <div className="container">
                        <div className={styles.profile__details}>
                            <div className={styles.profile__photo}>
                                {currentUser.avatar_url &&
                                    <img src={currentUser.avatar_url} alt={currentUser.name || currentUser.bio} />}
                            </div>

                            <div className={styles.profile__stats}>
                                <div className={styles.profile__statusCard}>
                                    <span>Followers</span>
                                    <span>{currentUser.followers}</span>
                                </div>

                                <div className={styles.profile__statusCard}>
                                    <span>Following</span>
                                    <span>{currentUser.following}</span>
                                </div>

                                {currentUser.location &&
                                    <div className={styles.profile__statusCard}>
                                        <span>Location</span>
                                        <span>{currentUser.location}</span>
                                    </div>}
                            </div>
                        </div>

                        <div className={styles.profile__user}>
                            <header className={styles.profile__userName}>
                                <h1>{currentUser.name || currentUser.bio}</h1>
                            </header>

                            {currentUser.bio &&
                                <p className={styles.profile__userBio}>{currentUser.bio}</p>}
                        </div>
                    </div>
                </section>
            )
    )
}

export default Profile