import "./Home.css";
import { MessageCard, Toolbar } from "../../Component/components";
import { useState, useEffect } from "react";
import { useGetRequest } from "../../utils/Hooks/useGetRequest";

export default function Home() {   
    const { data, isLoading, error } = useGetRequest('/post');
    const [posts, setPosts] = useState([]); 

    useEffect(() => {
        if (data) {
        setPosts(data);
        }
    }, [data]);

    const handlePostCreated = (newPost) => {
        newPost = {
            ...newPost,
            user:{
                id: newPost.authorId,
                nickname: JSON.parse(localStorage.getItem('user')).username || "Anonyme",
            }
        }

        setPosts(currentPosts => {
            const updatedPosts = [newPost, ...currentPosts]; 
            return updatedPosts;
        });
    };


    if (isLoading) {
        return <div>Chargement des posts...</div>;
    }

    if (error) {
        return <div>Erreur lors du chargement des posts: {error}</div>;
    }


    return (
        <div className="home">
            <Toolbar onAddPost={handlePostCreated}/>

            <div className="post-list">
                <h1>Posts</h1>
                <div className="post-cards">
                    {posts && posts.length > 0 ? (
                        posts.map(post => (
                            <MessageCard key={post.id} post={post}/>
                        ))
                    ) : (
                        <p>Aucun post disponible</p>
                    )}
                </div>
            </div>
        </div>
    );
}