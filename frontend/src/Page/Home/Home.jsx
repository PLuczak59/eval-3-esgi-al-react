import "./Home.css";
import MessageCard from "../../Component/MessageCard/MessageCard";
import user from "../../Data/user.json";
import { useState } from "react";


export default function Home() {
    const [test, setTest] = useState(0);
    return (
        <>
            <div className="home">
                <h1>Welcome to the Home Page</h1>

                <MessageCard user={user} Post={Post} />

            </div>
        </>
    )
}