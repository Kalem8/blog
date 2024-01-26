export default function LoginPage() {
    return (
        <form className="login">
        <h1>Se connecter</h1>
            <input type="text" placeholder="Nom d'utilisateur" />
            <input type="password" placeholder="Mot de passe" />
            <button>Connexion</button>
        </form>
    )
}