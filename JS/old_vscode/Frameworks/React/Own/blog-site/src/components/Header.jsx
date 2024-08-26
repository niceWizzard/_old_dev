

import { Link } from 'react-router-dom'


export default function Header() {


    return (
        <header>
            <div className="container">
                <div className="navbrand">Blog4Life</div>
                <ul className="navlinks">
                    <li className="navlink"><Link to="/">Home</Link></li>
                    <li className="navlink"><Link to="/blogs-all">Blogs</Link></li>
                    <li className="navlink"><Link to="/about">About</Link></li>
                </ul>
            </div>
        </header>
    )


}





