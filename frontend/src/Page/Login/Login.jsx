import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordField } from "../../Component/components";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/Home");
        }
    }, []);

    async function login(){
        try {
            fetch(`${import.meta.env.VITE_REACT_APP_URL_BACKEND}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(response => {
                if (!response.jwt) {
                    setError(true);
                    return;
                }
                localStorage.setItem('token', response.jwt);
                localStorage.setItem('user', JSON.stringify({
                    email: response.email,
                    id: response.id,
                    username: response.username
                }));
                navigate("/Home");
            });
            

        } catch (err) {
            setError(true);
        }
    }

    function onPasswordChange(value){
        setPassword(value);
    }

    return (
        <form className="form">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <PasswordField onKeyUp={onPasswordChange}/>

            <div className="form-group">
                <button type="button" className="valid-button" onClick={login}>
                    Se connecter
                </button>
            </div>

            <p>Vous n'avez pas de compte ? <a href="/Register">Inscrivez-vous</a></p>

            {error &&
                <span className="form-error">Email ou mot de passe incorrect</span>
            }
        </form>
    )
}