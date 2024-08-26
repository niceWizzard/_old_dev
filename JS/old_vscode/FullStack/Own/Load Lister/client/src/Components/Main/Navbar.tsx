import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import '../../css/navbar.css'
export interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {

    const history = useHistory()

    const logOut = () => {
        axios({
            method: "delete",
            url: '/users/user',
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data)
                if (res.data.type === 1) {
                    console.log("REDIRECTING!")
                    history.go(0)
                }
            })
    }

    return (
        <header>
            <div className="container">
                <h1 className="brand"><Link to="/">Load Lister</Link></h1>
                <nav className="navbar">
                    <li><Link to="/lists/create" className="navlink">Create</Link></li>
                    <li><Link to="/dashboard" className="navlink">Dashboard</Link></li>
                    <li><button
                        className="btn btn-logout"
                        onClick={() => logOut()}
                    >Log out</button></li>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;