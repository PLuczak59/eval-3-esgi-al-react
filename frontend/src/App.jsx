import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { UserList, Home } from './Page/pages'
import { Login, DarkModeButton } from './Component/components'
import { DarkModeContext } from './utils/Contexts/DarkModeContext'
import { useContext } from 'react'

function App() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);


  return (
    <>
      <div className={`app${darkMode ? "-dark" : ""}`}>
        <DarkModeButton />
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Users" element={<UserList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
