export interface GitHubUser {
    id: number
    login: string
    avatar_url: string
    name?: string
    bio?: string
    html_url: string
    followers?: number
    following?: number
    location?: string
}