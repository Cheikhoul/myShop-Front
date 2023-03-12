import { Link } from "react-router-dom";

export function Header() {
    return (
        <header>
            <img src="../asset/logo.png" className="logo"></img>
            <nav>
                <Link to="/home" style={{textDecoration:'none'}}><span className="nav">Accueil</span></Link>
                <Link to="/about" style={{textDecoration:'none'}}><span className="nav">À propos</span></Link>
                <Link to="/commande/monPanier" style={{textDecoration:'none'}}><span className="nav">Mon Panier</span></Link>
            </nav>
        </header>
    )
}