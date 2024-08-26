
import Nav from './Nav.component';
import { useLocation } from 'react-router-dom';


export interface NavbarProps {
    windowSize: number
}


const Navbar: React.FC<NavbarProps> = ({ windowSize }) => {

    const { pathname: urlLocation } = useLocation<string>();




    return (
        <>
            { !urlLocation.includes('sign-in') && !urlLocation.includes('sign-up') &&
                <Nav urlLocation={urlLocation} windowSize={windowSize} brandName="BlogIt" />
            }

        </>
    );
}

export default Navbar;