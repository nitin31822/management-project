"use client"
import React from 'react'
import { useSocket } from '../socketProvider'

function Notification() {
    const {notifications}=useSocket()
    console.log(notifications);
    
  return (
    <div>Notification</div>
  )
}

export default Notification