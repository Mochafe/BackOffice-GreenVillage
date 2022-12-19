import { Link, useNavigation } from "react-router-dom";

function Navbar() {
    const navigation = useNavigation();

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Green Village</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <Link class="nav-link active" to="/">Tableau de bord
                                <span class="visually-hidden">(current)</span>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/product/list">Produits</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" href="/order">Commandes</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" href="/account">Compte</Link>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-sm-2" type="search" placeholder="Mot-Clé" />
                            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Rechercher</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;