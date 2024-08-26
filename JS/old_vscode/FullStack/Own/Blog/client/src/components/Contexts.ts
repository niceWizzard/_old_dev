import React from "react";

interface User {
    email: string
    username: string
    bookmark: string[]
}



export const WINDOWContext = React.createContext(0)
export const USERContext = React.createContext<User | null>(null)
export const URLContext = React.createContext('http://localhost:4000')
