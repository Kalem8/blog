import { useContext, useEffect } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {

    const {setUserInfo,userInfo} = useContext(UserContext)
    useEffect(()=> {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, []);

    function Logout (event) {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method : 'POST',
        });
        setUserInfo(null);
    }

    //userInfo peut être connu ou incconu  donc on mets un ?
    const username = userInfo?.username

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

