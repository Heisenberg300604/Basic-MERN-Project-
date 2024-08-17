import React, { useContext } from 'react'
import { Context } from '../main'

const Profile = () => {

  const { user, isAuthenticated, loading } = useContext(Context)
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
          {/* <img src="https://via.placeholder.com/150" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" /> */}
          <div className="w-32 h-32 mx-auto bg-gray-500 text-white text-3xl flex items-center justify-center rounded-full dark:bg-gray-700">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="space-y-4 text-center divide-y dark:divide-gray-300">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">{user.name}</h2>
              <p className="px-5 text-xs sm:text-base dark:text-gray-600">{user.email}</p>
              <p className="px-5 text-xs sm:text-base dark:text-gray-600">Account ID: {user._id
              }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
