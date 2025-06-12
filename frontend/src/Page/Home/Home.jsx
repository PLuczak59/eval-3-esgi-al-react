import "./Home.css";
import MessageCard from "../../Component/MessageCard/MessageCard";

import { useState } from "react";


function PostsList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Récupérer les posts avec les utilisateurs
        fetch('/api/posts', {
            headers: {
                'Authorization': `Bearer ${token}` // Votre token d'authentification
            }
        })
            .then(response => response.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div>
            {posts.map(post => (
                <MessageCard key={post.id} post={post} />
            ))}
        </div>
    );
}