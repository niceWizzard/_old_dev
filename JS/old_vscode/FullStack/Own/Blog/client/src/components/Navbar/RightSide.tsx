import { Link } from "react-router-dom"
import IMG_User from '../../images/img_user.png';
import IMG_Settings from '../../images/img_settings-more.png';
import { USERContext, WINDOWContext } from '../Contexts';
import { useContext } from "react";


export interface RightSideProps {

    dropdown: {
        dropdownOpen: boolean
        setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
}



const RightSide: React.FC<RightSideProps> = ({ dropdown: { dropdownOpen, setDropdownOpen } }) => {


    const User = useContext(USERContext)
    const windowSize = useContext(WINDOWContext)


    const handleMoreSettingsClick = (e: any) => {
        e.preventDefault();
        setDropdownOpen(!dropdownOpen)
    }


    return (
        <>
            {User ? windowSize >= 650 &&
                <Link className="btn btn-profile-link" to="/dashboard">
                    <img src={IMG_User} alt="User.png" />
                    <h4>{User?.username}</h4>
                </Link>
                : <Link className="btn sign-in" to="/sign-in">
                    <img src={IMG_User} alt="User.png" />
                    <h2>Sign In</h2>
                </Link>}
            <a href="/"
                onClick={handleMoreSettingsClick}
                className={dropdownOpen ? 'settings-more open' : "settings-more"}
            >
                <img src={IMG_Settings} alt="Gear"
                />
            </a>
        </>
    );
}

export default RightSide;