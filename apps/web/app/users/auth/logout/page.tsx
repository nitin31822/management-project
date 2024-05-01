"use client"

import { signOut } from "next-auth/react"

import React from 'react'

function page() {
  return (
    <button onClick={() => signOut()}>Sign out</button>
  )
}

export default page