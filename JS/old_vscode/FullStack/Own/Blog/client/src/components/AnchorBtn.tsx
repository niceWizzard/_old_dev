export interface AnchorBtnProps {
    href?: string
    className?: string
    onClick?: () => any
    leftIcon?: any,
    iconClass?: string
}

const AnchorBtn: React.FC<AnchorBtnProps> = ({ children, onClick, href = '/', className, iconClass, leftIcon: iconLeft }) => {
    const handleClick = (e: any) => {
        e.preventDefault()
        onClick && onClick()
    }

    return (
        <a href={href} onClick={handleClick} className={className} >
            {iconLeft && <img src={iconLeft} alt="Icon" className={iconClass} />}
            {children}
        </a>
    );
}

export default AnchorBtn;