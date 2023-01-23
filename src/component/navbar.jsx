import { Link, NavLink, useNavigation } from "react-router-dom";

function Navbar() {
    const navigation = useNavigation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/dashboard">Green Village</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">Tableau de bord</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/category/list">Catégories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product/list">Produits</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/order">Commandes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/account">Compte</NavLink>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;