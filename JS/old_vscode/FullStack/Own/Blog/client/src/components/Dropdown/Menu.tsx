import { useEffect, useRef } from "react";

export interface MenuProps {
    calcHeight: (e: any) => void
}

const Menu: React.SFC<MenuProps> = ({ children, calcHeight }) => {

    const menu = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        calcHeight(menu.current)
    }, [calcHeight])

    return (
        <div className="menu" ref={menu} >
            {children}
        </div>
    );
}

export default Menu;