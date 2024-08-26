import React, { useContext, useEffect, useRef, useState } from "react";
import DropdownItem from "./DropdownItem";
import Menu from "./Menu";
import { USERContext, WINDOWContext } from '../Contexts';
export interface DropdownProps {
    dropdownOpen: boolean
    setDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

export type Menus = 'main' | 'settings' | 'about'


const DropdownMenu: React.FC<DropdownProps> = ({ children, dropdownOpen, setDropdown }) => {

    const [activeMenu, setActiveMenu] = useState<Menus>('main')
    const [menuHeight, setMenuHeight] = useState<number | 'auto'>('auto')
    const dropdown = useRef<HTMLDivElement | null>(null)
    const windowSize = useContext(WINDOWContext)
    const User = useContext(USERContext)


    useEffect(() => {
        dropdown.current && setMenuHeight(dropdown.current?.offsetHeight);

        const clicks = ['dropdown', 'menu-item']

        function hey(e: any) {
            const results = clicks.map(click => e.target.classList.contains(click)
            )
            if (!results.includes(true)) {
                setDropdown(false)
            }
        }

        function hey2(e: any) {
            if (e.key === 'Escape') {
                setDropdown(false)
            }
        }

        window.addEventListener('keydown', hey2)
        window.addEventListener('click', hey)

        return () => {
            window.removeEventListener('keydown', hey2)
            window.removeEventListener('click', hey)
        }

    }, [setDropdown])

    const calcHeight = (e: any) => {
        setMenuHeight(e.offsetHeight)
    }

    return (
        <div className="dropdown" ref={dropdown}
            style={windowSize > 400 ? { height: menuHeight } : {}}
        >
            {
                activeMenu === 'main' &&

                <Menu
                    calcHeight={calcHeight}
                >
                    {windowSize < 650 &&
                        <DropdownItem
                            href={User ? "/dashboard" : '/sign-in'} linkInside
                        >
                            {User ? 'Dashboard' : 'Sign In'}
                        </DropdownItem>


                    }

                    <DropdownItem
                        activeMenu={activeMenu}
                        onClick={() => setActiveMenu('settings')}
                    >
                        Settings {'>'}
                    </DropdownItem>

                    <DropdownItem
                        activeMenu={activeMenu}
                        onClick={() => setActiveMenu('about')}
                    >
                        About Us
                    </DropdownItem>
                    <DropdownItem >Hello</DropdownItem>
                </Menu>



            }

            {
                activeMenu === 'settings' &&
                <Menu
                    calcHeight={calcHeight}
                >
                    <DropdownItem
                        activeMenu={activeMenu}
                        onClick={() => setActiveMenu('main')}
                    >
                        Back
                    </DropdownItem>
                    <DropdownItem
                        activeMenu={activeMenu}
                    >
                        Dark Mode: On
                    </DropdownItem>
                </Menu>
            }

            {
                activeMenu === 'about' &&
                <Menu
                    calcHeight={calcHeight}
                >
                    <DropdownItem
                        activeMenu={activeMenu}
                        onClick={(e: any) => {
                            setActiveMenu('main')
                        }}
                    >
                        Back
                    </DropdownItem>
                    <DropdownItem href="https://youtube.com" linkInside={false} >Youtube</DropdownItem>
                    <DropdownItem href="https://facebook.com" linkInside={false} >facebook</DropdownItem>
                    <DropdownItem href="https://twitter.com" linkInside={false} >twitter</DropdownItem>
                </Menu>
            }


        </div>
    );
}

export default DropdownMenu;