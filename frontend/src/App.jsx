import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { UserList, Home, Login, Register } from './Page/pages'
import { DarkModeButton } from './Component/components'
import { DarkModeContext } from './utils/Contexts/DarkModeContext'
import { useContext } from 'react'

function App() {
  let user = {
    email: "pluczak@myges.fr",
    firstname: "Pierre-Henri",
    lastname: "Luczak",
    role: "admin",
  }
  const {darkMode, setDarkMode} = useContext(DarkModeContext);


  return (
    <>
      <div className={`app${darkMode ? "-dark" : ""}`}>
        <DarkModeButton />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Users" element={<UserList />} />
            </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
