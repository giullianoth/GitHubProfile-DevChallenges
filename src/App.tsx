import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Profile from './components/Profile'
import Repositories from './components/Repositories'

const App = () => {
  const [search, setSearch] = useState<string>("")

  return (
    <>
      <Header search={search} setSearch={setSearch} />

      <main>
        <Profile />
        <Repositories />
      </main>

      <Footer />
    </>
  )
}

export default App
