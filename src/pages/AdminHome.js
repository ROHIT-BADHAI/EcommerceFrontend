import React from 'react'
import Navbar from '../features/navbar/Navbar' 
import AdminProductList from '../features/admin/components/AdminProductList'

function AdminHome() {
  return (
    <div>
    <Navbar>
        <AdminProductList/>
    </Navbar>    
    </div>
  )
}

export default AdminHome
