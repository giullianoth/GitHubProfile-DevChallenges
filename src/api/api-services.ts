import { useCallback, useState } from "react"
import type { GitHubUser } from "../types/user"

const API_URL = "https://api.github.com"
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const APIServices = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const searchUsers = useCallback(async (search: string) => {
        setError(null)

        if (!search) {
            return []
        }

        setLoading(true)

        try {
            const url = `${API_URL}/search/users?q=${encodeURIComponent(search)}&per_page=5`

            const searchResponse = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${GITHUB_TOKEN}`,
                    "Accept": "application/vnd.github+json"
                }
            })

            if (searchResponse.status === 403) {
                setError("Search limit reached. Please try again in a few minutes.")
                return []
            }

            if (!searchResponse.ok) {
                throw new Error("Error on search")
            }

            const searchData = await searchResponse.json()
            const basicUsers = searchData.items ?? []

            const detailedUsersPromises = basicUsers.map(async (user: any) => {
                const userResponse = await fetch(`${API_URL}/users/${user.login}`, {
                    headers: {
                        "Authorization": `Bearer ${GITHUB_TOKEN}`,
                        "Accept": "application/vnd.github+json"
                    }
                })

                if (userResponse.status === 403) {
                    setError("Search limit reached. Please try again in a few minutes.")
                    throw new Error("Search limit reached.")
                }

                if (!userResponse.ok) {
                    throw new Error("Error on fetch detailed users")
                }

                return userResponse.json()
            })

            const detailedUsers = await Promise.all(detailedUsersPromises)
            return detailedUsers as GitHubUser[]
        } catch (error) {
            console.error("Unexpected error during fetch users:", error)
            return []
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        loading,
        error,
        searchUsers
    }
}

export default APIServices