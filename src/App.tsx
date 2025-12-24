import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Profile from './components/Profile'
import Repositories from './components/Repositories'
import APIServices from './api/api-services'

const DEBOUNCE_TIMEOUT = 500
const INITIAL_USER = "github"

const App = () => {
  const [userName, setUserName] = useState<string>("")
  const { GITHUB_TOKEN, validateToken } = APIServices()
  
  useEffect(() => {
    const checkAuth = async () => {
        const isValid = await validateToken()
        
        if (!isValid && GITHUB_TOKEN) {
            console.warn("Warning: Your GITHUB_TOKEN is invalid. The app will function with reduced limits.")
        }
    };

    checkAuth()
}, [validateToken])

  const handleSelectUser = (value: string) => {
    setUserName(value)
  }

  return (
    <>
      <Header
        onSelectUser={handleSelectUser}
        debounceTimeout={DEBOUNCE_TIMEOUT} />

      <main>
        <Profile
          userName={userName}
          initialUser={INITIAL_USER} />

        <Repositories
          userName={userName}
          debounceTimeout={DEBOUNCE_TIMEOUT}
          initialUser={INITIAL_USER} />
      </main>

      <Footer />
    </>
  )
}

export default App
