import React from 'react'
import UserOrder from '../features/user/components/UserOrder'
import Navbar from '../features/navbar/Navbar'


function UserOrdersPage() {
  return (
    <div>
      <Navbar>
        <h1 className='mx-auto text-2xl font-bold'>My Orders</h1>
      <UserOrder></UserOrder>
      </Navbar>
      
    </div>
  )
}

export default UserOrdersPage