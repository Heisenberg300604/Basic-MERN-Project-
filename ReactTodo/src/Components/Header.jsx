import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
  const { isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
  console.log(isAuthenticated);
  
  const handleLogout = async()=>{
    setLoading(true);
    try {
      const {data} = await axios.get(
        "api/v1/logout",
        {
          withCredentials: true,
        }
      )
      toast.success(data.message)
      setIsAuthenticated(false)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(true)
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="navbar border-b-2 border-gray-100">
        <div className="navbar-start">
          <button className="btn btn-ghost text-xl text-black">Let's Do It!</button>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Link to="/"><li className='text-black hover:bg-zinc-100 rounded-lg mr-2'><a>Home</a></li></Link>
            <Link to="/profile"><li className='text-black rounded-lg hover:bg-zinc-100'><a>Profile</a></li></Link>
          </ul>
        </div>
        <div className="navbar-end">
        {
          isAuthenticated ? <button disabled={loading} onClick={handleLogout} className="btn btn-outline px-6 text-black hover:bg-black hover:text-white mr-4">Log Out</button> : <Link to="/login"><button className="btn btn-outline px-6 text-black hover:bg-black hover:text-white mr-4">Log in</button></Link>
        }
        </div>
      </div>

    </div>
  )
}

export default Header
