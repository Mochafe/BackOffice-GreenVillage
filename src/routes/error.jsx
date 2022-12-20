import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return(
        <div className="text-center mt-5 d-flex flex-column">
            <p>Une erreur c'est produite</p>
            <small>{ error.statusText || error.message }</small>
            <Link to={"/"}>
                Retour à l'accueil
            </Link>
        </div>
    )
}