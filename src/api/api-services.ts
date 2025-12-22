import { useCallback, useState } from "react"

const API_URL = "https://api.github.com"

const APIServices = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const searchUsers = useCallback(async (search: string) => {
        setLoading(true)
        
        try {
            const response = await fetch(`${API_URL}/search/users?q=${search}`).then(res => res.json())
            return response.items
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        loading,
        searchUsers
    }
}

export default APIServices