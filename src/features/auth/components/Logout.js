import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { signOutAsync } from '../authSlice';

function Logout() {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(signOutAsync("demo")) // yaha pe UserId daal 
    },[])
  return (
    <>
      {/* //ye protected me hai as soon  as user==null goes to /login */}
    </>
  )
}

export default Logout;
