import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

export interface AnchorProps {
    href: string
    _target?: string
    onClick?: MouseEventHandler<HTMLAnchorElement>

    iconClass?: string
    leftIcon?: any
}

const Anchor: React.FC<AnchorProps> = ({ children, onClick, href, _target, leftIcon, iconClass }) => {

    return (
        <Link to={href} onClick={onClick} target={_target && _target}>
            {leftIcon && <img src={leftIcon} alt="Icon" className={iconClass} />}
            {children}
        </Link>
    );
}

export default Anchor;