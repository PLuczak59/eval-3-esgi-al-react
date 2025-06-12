import "./Register.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordField } from "../../Component/components";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
        if (token) {
          navigate("/Home");
        }
    }, []);

  async function register() {

    try {
        if (!email || !username || !password || !confirmPassword) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        if (password.password !== confirmPassword.confirmPassword) {
            setError("Les mots de passes ne sont pas identiques.");
            return;
        }    

        fetch(`${import.meta.env.VITE_REACT_APP_URL_BACKEND}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                nickname: username,
                password: password.password,
            })
        })
        .then((response) => {
            if (!response.ok) {
                setError("Une erreur s'est produite lors de l'inscription. Veuillez réessayer plus tard.")
            }
            
            navigate("/");
        });
    } catch (err) {
      setError("Une erreur s'est produite lors de l'inscription. Veuillez réessayer plus tard.");
    }
  }

  function onPasswordChange(value) {
    setPassword(value);
  }

  function onConfirmPasswordChange(value) {
    setConfirmPassword(value);
  }

  return (
    <form className="form">
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

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <PasswordField onKeyUp={onPasswordChange} />
      <PasswordField onKeyUp={onConfirmPasswordChange} isConfirm={true} />

      <div className="form-group">
        <button type="button" className="valid-button" onClick={register}>
          S'inscrire
        </button>
      </div>

      <p>
        Vous avez déjà un compte ? <a href="/">Se connecter</a>
      </p>

      {error && <span className="form-error">{error}</span>}
    </form>
  );
}
