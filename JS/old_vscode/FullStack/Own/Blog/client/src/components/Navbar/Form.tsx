import React, { useEffect } from "react";
import IMG_Back from '../../images/img_back.svg'
import IMG_Search from '../../images/img_search.svg'


export interface FormProps {
    className: string
    text: {
        searchText: string
        setSearchText: React.Dispatch<React.SetStateAction<string>>
    }
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>
}

const Form: React.FC<FormProps> = ({ children, className, text: { setSearchText, searchText }, setShowSearch, ...props }) => {

    useEffect(() => {
        console.log("FORM RENDERED!")
    })



    return (
        <form className={className} >
            <a href="/" onClick={(e) => {
                e.preventDefault()
                setShowSearch(false)
            }} className="btn-close-search-input" ><img src={IMG_Back} alt="back button" className="search-input-mobile-img" /></a>
            <div className="input-search-mobile">
                <input type="text" placeholder="Search" value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
                {searchText &&
                    <a href="/" onClick={(e) => {
                        e.preventDefault()
                        setSearchText('')
                    }} >x</a>}
            </div>
            <button type="submit" className="btn-submit-search-input-mobile" ><img src={IMG_Search} alt="search button" /></button>
        </form>
    );
}

export default (Form);