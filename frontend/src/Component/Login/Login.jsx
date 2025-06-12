import "./Login.css";
import { useState } from "react";
import { PasswordField } from "../components";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordComplexity, setPasswordComplexity] = useState("");
    const [error, setError] = useState(false);

    function login(){
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
    }

    function onPasswordChange(value){
        setPassword(value);
    }

    return (
        <form className="form" onSubmit={login}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <PasswordField onKeyUp={onPasswordChange}/>

            <div className="form-group">
                <button type="submit" className="valid-button">
                    Se connecter
                </button>
            </div>

            {error &&
                <span className="form-error">Email ou mot de passe incorrect</span>
            }
        </form>
    )
}