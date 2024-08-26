"use client"

import { useStore } from "@/app/page"

const Buttons = () => {


  return (
    <div>
        <button 
            onClick={() => {
                console.log(useStore.getState())
                useStore.setState((state) => ({
                    count: state.count + 1
                }));
            }}
          >Increment</button>
        <button 
            onClick={() => {
            useStore.setState((state) => ({
                count: state.count - 1
            }));
            }}
        >Decrement</button>
    </div>
  )
}

export default Buttons