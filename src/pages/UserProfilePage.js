import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile'

function UserProfilePage() {
  return (
    <div>
      <Navbar>
      <h1>MY PROFILE</h1>
        <UserProfile/>
      </Navbar>
    </div>
  )
}

export default UserProfilePage
