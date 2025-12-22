import './App.css'
import Header from './components/Header'
import Profile from './components/Profile'
import Repositories from './components/Repositories'

const App = () => {
  return (
    <>
      <Header />

      <main>
        <Profile />
        <Repositories />
      </main>
    </>
  )
}

export default App
