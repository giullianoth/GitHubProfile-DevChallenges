import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                Coded by <a href="https://github.com/giullianoth" target="_blank" rel="noopener noreferrer">Giulliano Guimarães</a>
            </p>
        </footer>
    )
}

export default Footer