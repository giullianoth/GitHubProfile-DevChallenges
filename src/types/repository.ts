export interface GitHubRepository {
    id: number
    name: string
    html_url: string
    description?: string
    forks_count?: number
    stargazers_count?: number
    updated_at: Date | string
    license?: {
        key: string
        name: string
        spdx_id: string
    }
}