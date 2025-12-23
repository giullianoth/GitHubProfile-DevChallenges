import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Profile from './components/Profile'
import Repositories from './components/Repositories'

const App = () => {
  const [userName, setUserName] = useState<string>("")

  const handleSelectUser = (value: string) => {
    setUserName(value)
  }

  return (
    <>
      <Header onSelectUser={handleSelectUser} />

      <main>
        <Profile userName={userName} />
        <Repositories userName={userName} />
      </main>

      <Footer />
    </>
  )
}

export default App
