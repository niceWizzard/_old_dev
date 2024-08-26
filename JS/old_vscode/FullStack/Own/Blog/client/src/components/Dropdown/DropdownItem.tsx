import React from "react";
import { Menus } from './DropdownMenu'

export interface DropdownItemProps {
    leftIcon?: string
    rightIcon?: string
    activeMenu?: Menus
    onClick?: (e?: any) => any
    href?: string
    target?: string
    linkInside?: boolean
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, leftIcon, rightIcon, onClick, href = '#', target, linkInside = true }) => {

    if (!linkInside) {
        target = "_blank"
    }


    const handleOnClick = (e: any) => {
        if (href === '#') {
            e.preventDefault()
        }
        onClick && onClick(e)
    }

    return (
        <a href={href} className="menu-item" target={target} rel="noreferrer"
            onClick={handleOnClick}
        >
            <span className="icon-button">{leftIcon} </span>
            <p className="menu-item-text" >{children}</p>
            <span className="icon-button">{rightIcon}</span>

        </a>
    );
}

export default DropdownItem;