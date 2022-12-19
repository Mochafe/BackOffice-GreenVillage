import { Link, useNavigation } from "react-router-dom";

function Navbar() {
    const navigation = useNavigation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Green Village</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Tableau de bord</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/product/list">Produits</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/order">Commandes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/account">Compte</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-sm-2" type="search" placeholder="Mot-Clé" />
                            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Rechercher</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;