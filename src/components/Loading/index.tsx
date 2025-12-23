import styles from "./Loading.module.css"

type Props = {
    className?: string
    small?: boolean
}

const Loading = ({ className, small }: Props) => {
    return (
        <div className={styles.loading
            + (className ? ` ${className}` : "")
            + (small ? ` ${styles.small}` : "")}>
            <div className={styles.circle}>
                <div className={styles.spinner}></div>
            </div>
        </div>
    )
}

export default Loading