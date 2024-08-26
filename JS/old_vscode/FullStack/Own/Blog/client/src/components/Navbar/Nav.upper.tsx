import React, { useContext, useEffect, useRef, useState } from "react";

import CloseNavBTN from '../../images/BTN_close-nav.png'

import IMG_Search from '../../images/img_search.svg'
import { WINDOWContext } from '../Contexts';
import { Link } from "react-router-dom";
import DropdownMenu from "../Dropdown/DropdownMenu";
import Form from "./Form";
import RightSide from "./RightSide";
import FormComponent from "./Form.component.";



export interface NavUpperProps {
    setNavOpen: React.Dispatch<React.SetStateAction<boolean>>
    navOpen: boolean
    brandName: string
}

const NavUpper: React.FC<NavUpperProps> = ({ setNavOpen, navOpen, brandName }) => {



    const [searchText, setSearchText] = useState('');

    const windowSize = useContext(WINDOWContext)
    const [showSearch, setShowSearch] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        windowSize > 450 ? setShowSearch(false) : setShowSearch(false)
    }, [windowSize])

    const handleCloseNav = (e: any) => {
        e.preventDefault()
        setNavOpen(!navOpen)
    }

    const getBtnClass = () => {
        return navOpen ? 'btn-close-nav' : 'btn-close-nav close'
    }


    const showSearchInput = (e: any) => {
        e.preventDefault()
        setShowSearch(!showSearch)
    }

    const onSubmit = (e: any) => {
        // console.log(e)
    }


    return (
        <>
            <nav className="upper" >
                <a href="//"
                    onClick={handleCloseNav}
                    className={getBtnClass()}
                ><img src={CloseNavBTN} alt="Close the nav btn" /></a>

                {!showSearch && <div className="brand"><Link to="/">{brandName}</Link> </div>}
                <FormComponent formClass="search-input" condition={windowSize > 400} getter={(e) => {
                    // console.log(e)
                    onSubmit(e)
                }} />

                {!showSearch && <div className="side-right">
                    {windowSize <= 400 && <a href="/" onClick={showSearchInput} className="btn-show-search-input-mobile" ><img src={IMG_Search} alt="search" /> </a>}
                    <RightSide dropdown={{ setDropdownOpen, dropdownOpen }} />

                </div>

                }
                {windowSize <= 400 && showSearch &&
                    <Form className="search-input-mobile" text={{ searchText, setSearchText }} setShowSearch={setShowSearch} />

                }
            </nav>
            {dropdownOpen &&
                <DropdownMenu dropdownOpen={dropdownOpen} setDropdown={setDropdownOpen} />}
        </>
    );
}

export default React.memo(NavUpper);