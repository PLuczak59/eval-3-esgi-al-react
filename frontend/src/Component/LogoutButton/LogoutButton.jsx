import "./LogoutButton.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from '../Button/Button'

export default function LogoutButton(){
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/");
    }

    return (
        <Button  text="Deconnexion" onClick={logout} color="red" />
    )
}