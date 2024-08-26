import { Link } from "react-router-dom";
import IMG_Books from '../../images/img_books.png';
import IMG_Rankings from '../../images/img_rankings.png';
import IMG_Saveds from '../../images/img_saveds.png';

export interface NavSideProps {
    navClass: string
    urlLocation: string,
    setNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type ClassName = '/' | '/blogs/subscriptions' | '/blogs/saveds'


const NavSide: React.FC<NavSideProps> = ({ navClass, urlLocation, setNavOpen }) => {


    const getNavLinksClass = ({ urlType }: { urlType: ClassName }): string => {
        let className = 'navlink ';
        if (urlType === urlLocation) {
            return 'navlink current';
        }

        return className
    }

    const setNavOpenFalse = () => {
        setNavOpen(false)
    }


    return (
        <nav className={navClass}>
            <ul className="navlinks">
                <li>
                    <Link className={getNavLinksClass({ urlType: '/' })} to="/"
                        onClick={setNavOpenFalse}
                    >
                        <img src={IMG_Rankings} alt="Rankings Link" />
                        <p className="navlink-text">Rankings</p>
                    </Link>
                </li>

                <li>
                    <Link className={getNavLinksClass({ urlType: '/blogs/subscriptions' })} to="/blogs/subscriptions"
                        onClick={setNavOpenFalse}
                    >
                        <img src={IMG_Books} alt="Subscriptions Link" />
                        <p className="navlink-text">Subscriptions</p>
                    </Link>
                </li>

                <li>
                    <Link className={getNavLinksClass({ urlType: '/blogs/saveds' })} to="/blogs/saveds"
                        onClick={setNavOpenFalse}
                    >
                        <img src={IMG_Saveds} alt="Saved Blogs Link" />
                        <p className="navlink-text">Saved Blogs</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavSide;