import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from "../src/Pages/Home.jsx"
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Profile from "../src/Pages/Profile.jsx"
import ProtectedRoute from './Protectedroute.jsx'


export const Context = createContext({ isAuthenticated: false });

const ContextWrapper = () => {
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState({});
  return (
    <Context.Provider value={{
      isAuthenticated,setIsAuthenticated,
      loading,setLoading,user,setUser
    }}> 
      <Router>
        <Routes>
          <Route  element={<App />}>
            <Route path="/" element={<ProtectedRoute element={<Home /> } />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>,
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextWrapper/>
  </StrictMode>,
)
