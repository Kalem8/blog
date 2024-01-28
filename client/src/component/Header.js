import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

export default function Header() {
    const [username, setUsername] = useState(null);
    useEffect(()=> {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUsername(userInfo.username);
            })
        })
    }, []);

    function Logout (event) {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method : 'POST',
        });
        setUsername(null);
    }

    return (

        <header>
            <Link to="" className="logo"> MonBlog </Link>
            <nav>
                {username && (
                    <>
                        <Link to="/create"> Créer un article </Link>
                        <a onClick={Logout}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Connexion</Link>
                        <Link to="/Register">Inscription</Link>
                    </>
                )}
            </nav>
        </header>

    )
}

