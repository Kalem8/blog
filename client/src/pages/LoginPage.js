import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../component/UserContext";

export default function LoginPage() {
    //Data
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    //Functions
    function WritingInputUsername(event) {
        setUsername(event.target.value);
    }
    function WritingInputPassword(event) {
        setPassword(event.target.value);
    }
    async function login(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            //'Include' signifie que les cookies doivent être envoyé même si le domaine est différent.
            //mon client est host: 3000 mon back host: 4000.
            //Nous souhaitons envoyer les cookies car elles contiennent le token JWT de l'utilisateur.
            //Nous permettant de gérer la session de l'utilisateur.
            credentials: 'include',
        })
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        } else {
            alert("Nom d'utilisateur ou mot de passe incorrect")
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    //Rendu
    return (
        <form className="login"
            onSubmit={login}>
            <h1>Se connecter</h1>
            <input type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={WritingInputUsername}
            />
            <input type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={WritingInputPassword}
            />
            <button className="btn-one">Connexion</button>
        </form>
    )
}