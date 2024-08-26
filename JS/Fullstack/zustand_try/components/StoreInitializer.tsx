"use client"
import { T, useStore } from '@/app/page'
import React, { useEffect, useRef } from 'react'

const StoreInitializer = ({store } : {store : T}) => {

    const initialized = useRef(false);
    if (!initialized.current) {
        console.log("INITIALIZING STORE")
        useStore.setState(store);
        initialized.current = true;
    }
  return (
    <>
    </>
  )
}

export default StoreInitializer