import Header from "../src/Components/Header.jsx"
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./main.jsx";

function App() {

  const {setUser, setIsAuthenticated} = useContext(Context);

  useEffect(()=>{
    axios.get(
      "api/v1/profile",
      {
        withCredentials:true,
      }
    ).then((res)=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
    }).catch((error)=>{
      setUser({})
      setIsAuthenticated(false);
    })
  },[])

  return (
    <div className="h-screen bg-white">
      <Toaster />
      <Header />
      <Outlet />
    </div>
  )
}

export default App
