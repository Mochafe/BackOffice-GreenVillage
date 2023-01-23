import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from '../../config.json';
import Cookies from "js-cookie";




export const Authentification = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const errorMsg = useRef();

    const navigate = useNavigate();

    const handleSubmit = () => {
        fetch(`${config.url}/api/login_check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: mail,
                password: password
            })
        }).then(result => {
            result.json().then(json => {
                Cookies.set('token', json.token, { expires: 1 });
                navigate("/dashboard");
            })
        })
    }

    if(Cookies.get("token")) {
        axios.interceptors.request.use(config => {
          config.headers = {
            'Authorization': `Bearer ${Cookies.get("token")}`
          }
        })
      }

    return (
        <div className="container top-50 position-absolute ">
            <div>
                <label className="form-label">E-mail:</label>
                <input className="form-control" type={"email"} value={mail} placeholder="Votre e-mail" onChange={(event) => {
                    setMail(event.currentTarget.value);
                }}/>
            </div>
            <div>
                <label className="form-label">Mot de passe:</label>
                <input className="form-control" type={"password"} value={password} placeholder="Votre mot de passe" onChange={(event) => {
                    setPassword(event.currentTarget.value);
                }}/>
                <p ref={errorMsg} className="text-danger text-center d-none">L'e-mail ou le mot de passe est incorrecte.</p>
            </div>
            <input className="btn btn-success mt-3" type={"button"} value="Connection" onClick={handleSubmit}/>
        </div>
    )
}