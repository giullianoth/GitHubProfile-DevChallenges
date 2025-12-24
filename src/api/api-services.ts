import { useCallback, useState } from "react"
import type { GitHubUser } from "../types/user"
import type { GitHubRepository } from "../types/repository"

const API_URL = "https://api.github.com"
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const AUTHENTICATION_CONFIG: RequestInit = GITHUB_TOKEN
    ? {
        headers: {
            "Authorization": `Bearer ${GITHUB_TOKEN}`,
            "Accept": "application/vnd.github+json"
        }
    }
    : {}

const APIServices = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const validateToken = useCallback(async (): Promise<boolean> => {
        if (!GITHUB_TOKEN) {
            return false
        }

        try {
            const response = await fetch(`${API_URL}/user`, AUTHENTICATION_CONFIG)

            if (response.status === 200) {
                console.log("GitHub Token: Valid (5000 request limit enabled)")
                return true
            }

            if (response.status === 401) {
                console.error("GitHub Token: Invalid ou expired.")
                return false
            }

            return false
        } catch (error) {
            console.error("Error on validate token:", error)
            return false
        }
    }, [])

    const searchUsers = useCallback(async (search: string) => {
        setError(null)

        if (!search) {
            return []
        }

        setLoading(true)

        try {
            const url = `${API_URL}/search/users?q=${encodeURIComponent(search)}&per_page=5`

            const searchResponse = await fetch(url, AUTHENTICATION_CONFIG)

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
                const userResponse = await fetch(`${API_URL}/users/${user.login}`, AUTHENTICATION_CONFIG)

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
            setError("Error on search")
            return []
        } finally {
            setLoading(false)
        }
    }, [])

    const getUser = useCallback(async (userName: string) => {
        setError(null)

        if (!userName) {
            return null
        }

        setLoading(true)

        try {
            const response = await fetch(`${API_URL}/users/${userName}`, AUTHENTICATION_CONFIG)

            if (response.status === 404) {
                setError("User not found")
                return null
            }

            if (response.status === 403) {
                setError("Search limit reached. Please try again in a few minutes.")
                return null
            }

            if (!response.ok) {
                throw new Error("Error on search")
            }

            const data = await response.json()
            return data as GitHubUser
        } catch (error) {
            console.error(error)
            setError("Error during fetch user")
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    const getReposByUser = useCallback(async (userName: string) => {
        setError(null)

        if (!userName) {
            return []
        }

        setLoading(true)

        try {
            const response = await fetch(`${API_URL}/users/${userName}/repos`, AUTHENTICATION_CONFIG)

            if (response.status === 404) {
                setError("Repositories not found")
                return []
            }

            if (response.status === 403) {
                setError("Search limit reached. Please try again in a few minutes.")
                return []
            }

            if (!response.ok) {
                throw new Error("Error on search")
            }

            const data = await response.json()
            return data as GitHubRepository[]
        } catch (error) {
            console.error("Unexpected error during fetch repositories:", error)
            setError("Error on search")
            return []
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        token: GITHUB_TOKEN,
        validateToken,
        loading,
        error,
        searchUsers,
        getUser,
        getReposByUser
    }
}

export default APIServices