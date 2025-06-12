import "./Home.css";
import { MessageCard, LogoutButton } from "../../Component/components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(!token){
            navigate("/");
        }
    }, []);


    return (
        <div>
            <LogoutButton />
            <h1>Welcome to the Home Page</h1>
        </div>
    );
}