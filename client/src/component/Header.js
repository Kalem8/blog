import {Link} from "react-router-dom";

export default function Header() {

    return (

        <header>
            <Link to="" className="logo"> MonBlog </Link>
            <nav>
                <Link to="/login">Connexion</Link>
                <Link to="/register">Inscription</Link>
            </nav>
        </header>

    )
}

