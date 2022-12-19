import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return(
        <div>
            <p>Une erreur c'est produite</p>
            <small>{ error.statusText || error.message }</small>
        </div>
    )
}