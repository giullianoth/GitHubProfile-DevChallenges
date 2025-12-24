import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Profile from './components/Profile'
import Repositories from './components/Repositories'

const DEBOUNCE_TIMEOUT = 500
const INITIAL_USER = "github"

const App = () => {
  const [userName, setUserName] = useState<string>("")

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
