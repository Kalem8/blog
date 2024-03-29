import { useState } from "react";

export default function RegisterPage() {
    //data 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Logique 
    function WritingInputUsername(event) {
        setUsername(event.target.value)
    }
    function WritingInputPassword(event) {
        setPassword(event.target.value)
    }

    async function register(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.status === 200){
            alert ("L'inscription s'est correctement déroulé");
        } else {
            alert("L'inscription n'a pas eu lieu")
        }
    }
    //Rendu
    return (
        <form className="register"
            onSubmit={register}>
            <h1>S'inscrire</h1>
            <input type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={WritingInputUsername} />
            <input type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={WritingInputPassword} />
            <button className="btn-one">Register</button>
        </form>
    )
}