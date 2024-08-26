"use client"

import { SearchManufacturer } from "@/components";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


const SearchBar = () => {

    const [manufacturer, setManufacturer] = useState("")
    const [model, setModel] = useState('')
    const router = useRouter()

    const handleSearch = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(manufacturer === '' || model === '') {
            alert('Please fill in the search bar')
            return
        }
        
        const updateSearchParams = (model : string, manufacturer : string) => {
            const searchParams = new URLSearchParams(window.location.search)
            if(model) {
                searchParams.set('model', model)
            } else {
                searchParams.delete('model')
            }

            if(manufacturer) {
                searchParams.set('manufacturer', manufacturer)
            } else {
                searchParams.delete('manufacturer')
            }

            const newPathName = `${window.location.pathname}?${searchParams.toString()}`

            router.push(newPathName, {
                scroll: false,
            })
        }

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())

    }

    return <form onSubmit={handleSearch} className="search-bar">
        <div className="searchbar__item">
            <SearchManufacturer
            manufacturer={manufacturer}
            setManufacturer={setManufacturer}
            />
            <SearchButton classes="sm:hidden"
            />
        </div>
        <div className="searchbar__item">
            <Image
            src="/model-icon.png"
            width={25}
            height={25}
            className="absolute w-[20px] h-[20px] ml-4"
            alt="Car model"
            />
            <input type="text" 
            name="model"
            value={model}
            onChange={e => setModel(e.target.value)}
            placeholder="Tiguan"
            className="searchbar__input"
            />
            <SearchButton classes="sm:hidden" />
        </div>
        <SearchButton classes="max-sm:hidden" />

    </form>;
};

const SearchButton = ({classes} : {classes? : string}) => (
    <button type="submit" className={`-ml-3 z-10 ${classes}` }>
        <Image 
        src="/magnifying-glass.svg"
        alt='Search icon'
        width={40}
        height={40}
        className="object-contain"
        />
    </button>
)

export default SearchBar;
