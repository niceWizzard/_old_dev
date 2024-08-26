import Buttons from '@/components/Buttons'
import StoreInitializer from '@/components/StoreInitializer'
import { create } from 'zustand'

export interface T {
  count: number
}

export const useStore = create<T>(set => ({
    count: 100,
}))

async function fetchPokemons() {
  console.log("FETCHING")
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151', {next: {revalidate: 1}})
  const results = await res.json()
  return results
}



export default function Home({pokemons} : {pokemons: any[]}) {
  // const {count, decrement,increment} = useStore()
  // const pokemons = await fetchPokemons()
  console.log("PKLMONS",pokemons)
  return (
    <>
      <StoreInitializer store={useStore.getState()} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Count: {useStore.getState().count}</h1>
        <Buttons/>
      </main>
    </>
  )
}
