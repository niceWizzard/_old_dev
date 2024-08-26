"use client"

import React from 'react'


import { Session } from 'next-auth';



const OnBoardButton = ({
    session, action
} : {session : Session, action : (session : Session) => void}) => {
  return (
    <button
    onClick={() => action(session)}
    >OnBoardButton</button>
  )
}

export default OnBoardButton